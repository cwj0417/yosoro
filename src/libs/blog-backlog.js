import {storage} from "./bg"
import {merge} from "./util"
import defaultValue from "./defaultValue"
const storageKey = `blogBacklog`
import _ from "lodash"
export const blogBacklog = {
    init () {
        storage.get(storageKey)
            .then(suc => suc,
                () => {
                    storage.set(storageKey, defaultValue.blogBacklog)
                })
    },
    get () {
        return storage.get(storageKey)
            .then(res => {
                let t = _.cloneDeep(res)
                t.status.deadLine = new Date(t.status.deadLine)
                return t
            })
    },
    put (value) {
        let t = _.cloneDeep(value)
        t.status.deadLine = t.status.deadLine.valueOf()
        return storage.set(storageKey, t)
    }
}
blogBacklog.init()