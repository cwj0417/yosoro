import {memo} from "../../libs/bg";
import Vue from "vue";
let storage = {
    get() {
        return memo.get();
    },
    put(value) {
      return memo.put(value);
    }
};
const state = [];
const getters = {};
const mutations = {
    [`memo/modify`](state, value) {
        state = value;
        storage.put(value);
    },
    [`memo/add`](state) {
        state.push({
            title: "unnamed",
            content: ""
        });
        storage.put(state);
    },
    [`memo/delete`](state, index) {
        state.splice(index, 1);
        storage.put(state);
    },
    [`memo/set`](state, value) {
        for(let each of value) {
            state.push(each);
        }
    }
};
const actions = {
    [`memo/modify`]({commit}, value) {
        commit(`memo/modify`, value);
    },
    [`memo/add`]({commit}) {
        commit(`memo/add`);
    },
    [`memo/delete`]({commit}, index) {
        commit(`memo/delete`, index);
    },
    [`memo/get`]({commit}) {
        storage.get()
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