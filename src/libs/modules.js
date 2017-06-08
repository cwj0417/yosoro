import {storage} from "./bg"
const storageKey = "modules"
const ArrayContains = function (arr, ele) {
    return arr.indexOf(ele) > -1
}
export const modules = {
    init () {
        this.getActive()
            .then(null, err => {
                this.putActive(["placeholder"])
            })
    },
    get () {
        return storage.get(storageKey)
    },
    put (modules) {
        return storage.set(storageKey, modules)
    },
    putActive (arr) {
        return storage.set(`${storageKey}-active`, arr)
    },
    getActive () {
        return storage.get(`${storageKey}-active`)
    },
    isActive (title) {
        return this.getActive()
            .then(activeList => {
                return ArrayContains(activeList, title) ? Promise.resolve(true) : Promise.resolve(false)
            })
    },
    setActive(title, isActive) {
        return this.getActive()
            .then(activeList => {
                if (ArrayContains(activeList, title)) {
                    if (isActive) {
                        return Promise.resolve()
                    } else {
                        activeList.splice(activeList.indexOf(title), 1)
                        if (!activeList.length) {
                            activeList = ["placeholder"]
                        }
                        return this.putActive(activeList)
                    }
                }else {
                    if (isActive) {
                        activeList.push(title)
                        return this.putActive(activeList)
                    } else {
                        return Promise.resolve()
                    }
                }
            })
    }
}
modules.init()