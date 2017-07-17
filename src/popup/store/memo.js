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
    },
    [`memo/updateTitle`] (state, {index, value}) {
        state[index].title = value
    },
    [`memo/updateContent`] (state, {index, value}) {
        state[index].content = value
    }
};
const actions = {
    [`memo/modify`]({commit}) {
        return memo.put(state)
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
    },
    [`memo/updateTitle`] ({commit, dispatch}, {index, value}) {
        commit(`memo/updateTitle`, {index, value})
        return dispatch(`memo/modify`)
    },
    [`memo/updateContent`] ({commit, dispatch}, {index, value}) {
        commit(`memo/updateContent`, {index, value})
        return dispatch(`memo/modify`)
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}