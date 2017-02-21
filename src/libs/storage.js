export const storage = {
    setAll(obj) {
      return new Promise((resolve) => {
          chrome.storage.sync.set(obj, (callback) => {
              resolve(`ok${callback}`);
          })
      })
    },
    set(key, value) {
        let obj = {};
        obj[key] = value;
        return new Promise((resolve) => {
            chrome.storage.sync.set(obj, (callback) => {
                resolve(`ok${callback}`);
            })
        });
    },
    get(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (callback) => {
                if (callback[key]) {
                    resolve(callback[key]);
                } else {
                    reject(`value of ${key} was not found`);
                }
            });
        });
    },
    getAll() {
        return new Promise((resolve) => {
            chrome.storage.sync.get((callback) => {
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
        return new Promise((resolve) => {
            chrome.storage.sync.remove(key, (callback) => {
                resolve(callback);
            })
        });
    }
};