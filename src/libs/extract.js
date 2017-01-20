import {storage} from "./bg";
const storageKey = `extract`;

export const extract = {
    put(url, title, content) {
        this.get()
            .then((res) => {
                if (res[url]) {
                    res[url].push({
                        title,
                        content
                    })
                } else {
                    res[url] = [{
                        title,
                        content
                    }]
                }
                return storage.set(storageKey, res);
            }, () => {
                return storage.set(storageKey, {
                    [url]: [{
                        title,
                        content
                    }]
                })
            })
    },
    get() {
        return storage.get(storageKey);
    },
    clear(url, content = false) {
        return this.get()
            .then((res) => {
                if (res[url]) {
                    if (content === false) {
                        delete res[url];
                        return storage.set(storageKey, res);
                    } else {
                        res[url] = res[url].filter(each => each.content != content);
                        return storage.set(storageKey, res);
                    }
                }
            })
    }
};