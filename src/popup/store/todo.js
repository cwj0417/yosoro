import {Message} from "../../libs";
let sender = Message.sender;

const state = {
    list: []
};

const mutations = {
    [`todo/setList`](state, list) {
        state.list = list;
    },
    [`todo/getList`](state) {
        return state.list;
    }
};

const actions = {
    [`todo/get`]({commit}) {
        sender.send("todo.get")
            .then((list) => {
                commit(`todo/setList`, list);
            })
    },
    [`todo/remove`]({state, commit}, index) {
        state.list.splice(index, 1);
        commit(`todo/setList`, state.list);
        sender.send("todo.set", state.list);
    },
    [`todo/add`]({dispatch}, content) {
        sender.send("todo.add", content)
            .then(() => {
                dispatch(`todo/get`);
            });
    }
};

export default {
    state,
    mutations,
    actions
}