import {storage} from "./bg"
const storageKey = `todoList`;
export const todo = {
    get () {
        return storage.get(storageKey)
    },
    put (list) {
        return storage.set(storageKey, list)
    },
    add (todo) {
        return this.get()
            .then(list => {
                list.push(todo)
                return this.put(list)
            })
    },
    update (item) {
        return this.get()
            .then(list => {
                // 一开始没想好, 只能用ts判断了..其实是不合适的..
                list[list.indexOf(list.filter(a => a.ts === item.ts)[0])] = item
                return this.put(list)
            })
    }
}