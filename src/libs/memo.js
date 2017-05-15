import {storage} from "./bg";
const storageKey = `memo`;

export const memo = {
    get() {
        return storage.get(storageKey);
    },
    put(value) {
        return storage.set(storageKey, value)
    }
};