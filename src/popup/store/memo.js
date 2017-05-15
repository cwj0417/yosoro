import {memo} from "../../libs/bg";
const state = [];
const getters = {};
const mutations = {
    [`memo/modify`](state, value) {
        state = value;
    },
    [`memo/add`](state) {
        state.push({
            title: "unnamed",
            content: ""
        });
    },
    [`memo/delete`](state, index) {
        state.splice(index, 1);
    },
    [`memo/set`](state, value) {
        for(let each of value) {
            state.push(each);
        }
    }
};
const actions = {
    [`memo/modify`]({commit}, value) {
        return memo.put(value)
            .then(() => {
                commit(`memo/modify`, value);
            })
    },
    [`memo/add`]({commit}) {
        return memo.put(state)
            .then(() => {
                commit(`memo/add`);
            })
    },
    [`memo/delete`]({commit}, index) {
        return memo.put(state)
            .then(() => {
                commit(`memo/delete`, index);
            })
    },
    [`memo/get`]({commit}) {
        return memo.get()
            .then(res => {
                commit(`memo/set`, res);
            }, err => {
                console.log(err);
            })
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}