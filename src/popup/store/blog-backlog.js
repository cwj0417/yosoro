import {blogBacklog} from "../../libs/bg"
import defaultValue from "../../libs/defaultValue"
import Vue from "vue"
const state = defaultValue.blogBacklog
const mutations = {
    [`blog-backlog/set`] (state, payload) {
        blogBacklog.put(payload)
        for (let ele in payload) {
            state[ele] = payload[ele]
        }
    }
}
const actions = {
    [`blog-backlog/get`] ({commit}) {
        blogBacklog.get()
            .then(results => {
                commit(`blog-backlog/set`, results)
            })
    },
    [`blog-backlog/set`] ({commit}, payload) {
        commit(`blog-backlog/set`, payload)
    }
}
export default {
    state,
    mutations,
    actions
}