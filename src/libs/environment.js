import {storage} from "./bg";
const storageKey = `environment`;

export const environment = {
    setState(state) {
        storage.set(storageKey, state);
    },
    getState() {
        return storage.get(storageKey);
    }
};