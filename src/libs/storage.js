import {getBytes} from "./util"
import lodash from "lodash"
let {isArray, isPlainObject} = lodash
const invalidItemBytes = function ({key, value}) {
    return getBytes(value) + key.length > 8192 - 4
}
const catchError = function (rejectFn) {
    if(chrome.runtime.lastError) {
        console.warn("Whoops.. " + chrome.runtime.lastError.message)
        rejectFn && rejectFn(chrome.runtime.lastError.message)
    }
}
const getBatch = function (key, value) {
    let ret = []
    let cur = null
    if (isArray(value)) {
        cur = []
        for(let each of value) {
            cur.push(each)
            if (invalidItemBytes({key, value: cur})) {
                cur.pop()
                ret.push(cur)
                cur = [each]
            }
        }
        cur.length && ret.push(cur)
    } else if (isPlainObject(value)) {
        cur = {}
        for (let [k, v] of Object.entries(value)) {
            cur[k] = v
            if (invalidItemBytes({key, value: cur})) {
                delete cur[k]
                ret.push(cur)
                cur = {}
                cur[k] = v
            }
        }
        for (let test in cur) {
            ret.push(cur)
            break
        }
    }
    return ret
}
const merge = function (arr) {
    // 判断参数元素是数组还是对象, 再进行merge, 返回
    let ret = null
    if (isArray(arr[0])) {
        ret = []
        for (let item of arr) {
            ret = ret.concat(item)
        }
    } else if (isPlainObject(arr[0])) {
        ret = Object.assign(...arr)
    }
    return ret
}
export const storage = {
    setAll(obj) {
      return new Promise((resolve, reject) => {
          chrome.storage.sync.set(obj, (callback) => {
              catchError(reject)
              resolve(`ok${callback}`);
          })
      })
    },
    set(key, value) {
        let batches = getBatch(key, value)
        let processes = []
        batches.forEach((item, index) => {
            let obj = {}
            obj[index === 0 ? key : `${key}-p${index + 1}`] = item
            processes.push(new Promise((resolve, reject) => {
                chrome.storage.sync.set(obj, (callback) => {
                    catchError(reject)
                    resolve(`ok${callback}`);
                })
            }))
        })
        return Promise.all(processes)
            .then(res => merge(res), reject => Promise.reject(reject))
    },
    get(key) {
        let getFromStorage = function (originKey, level = 1) {
            let _key = level === 1 ? originKey : `${key}-p${level}`
            return new Promise((resolve) => {
                chrome.storage.sync.get(_key, (callback) => {
                    resolve(callback[_key])
                })
            })
        }
        return (async function () {
            let level = 1, keepGoing = true, cache = []
            while (keepGoing) {
                let temp = await getFromStorage(key, level++)
                if (!temp) {
                    keepGoing = false
                } else {
                    cache.push(temp)
                }
            }
            if (cache.length) {
                return merge(cache)
            } else {
                return Promise.reject(`get ${key} failed`)
            }
        })()
    },
    getAll() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get((callback) => {
                catchError(reject)
                resolve(callback);
            });
        })
    },
    sAdd(set, key, value) {
        return this.get(set)
            .then((result) => {
                result = result || {};
                result[key] = value;
                return this.set(set, result);
            });
    },
    sGet(set, key) {
        return this.get(set)
            .then((result) => {
                return (result && result[key]) ? Promise.resolve(result[key]) : Promise.reject("set not found");
            });
    },
    sRem(set, key) {
        return this.get(set)
            .then((result) => {
                if (result && result[key]) {
                    delete result[key];
                    return this.set(set, result);
                } else {
                    return Promise.reject("set not found");
                }
            });
    },
    remove(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.remove(key, (callback) => {
                catchError(reject)
                resolve(callback);
            })
        });
    }
};