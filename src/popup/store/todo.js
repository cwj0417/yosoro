import {todo} from "../../libs/bg";

const state = {
    list: []
};

const mutations = {
    [`todo/setList`](state, list) {
        state.list = list;
    },
    [`todo/getList`](state) {
        return state.list;
    },
    [`todo/add`] (state, todo) {
        state.list.push(todo)
    }
};

const actions = {
    [`todo/get`]({commit}) {
        todo.get()
            .then((list) => {
                list = list.map(a => {
                    return a.editing = false, a
                })
                commit(`todo/setList`, list);
            }, err => {
                console.log(err);
            })
    },
    [`todo/remove`]({state, commit}, item) {
        state.list.splice(state.list.indexOf(item), 1);
        return todo.put(state.list).then(() => {
            commit(`todo/setList`, state.list);
        }, () => {
            dispatch(`todo/get`);
        })
    },
    [`todo/add`]({dispatch, commit}, content) {
        let item = {
            content,
            ts: Date.now(),
            done: false
        }
        return todo.add(item)
            .then(() => {
                commit(`todo/add`, item)
            }, () => {
                dispatch(`todo/get`);
            });
    },
    [`todo/update`] ({}, item) {
        return todo.update(item)
    }
};

export default {
    state,
    mutations,
    actions
}