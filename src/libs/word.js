import {storage} from "./bg";
const storageKey = `word`;
import defaultValue from "./defaultValue"
let configValue = defaultValue.word

export const word = {
    init () {
        storage.get(storageKey)
            .then(suc => suc,
                () => {
                    return storage.set(storageKey, configValue.content)
                })
        storage.get(`${storageKey}_config`)
            .then(suc => suc,
                () => {
                    return storage.set(`${storageKey}_config`, configValue.config)
                })
    },
    getConfig () {
        return storage.get(`${storageKey}_config`)
    },
    putConfig (value) {
        return storage.set(`${storageKey}_config`, value);
    },
    get () {
        return storage.get(storageKey)
            .then(res => res, err => configValue.content)
    },
    putTab (tab, value) {
        return storage.sAdd(storageKey, tab, value)
    },
    getTab (tab) {
        return storage.sGet(storageKey, tab)
            .then(res => res, err => [])
    },
    put (value) {
        return this.getConfig()
            .then(({currentTab}) => {
                return this.getTab(currentTab)
                    .then(tabs => {
                        tabs.push(value)
                        return this.putTab(currentTab, tabs)
                    })
            })

    }
};
word.init()