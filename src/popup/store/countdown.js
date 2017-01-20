import {sender} from "../../libs/cm";
const state = {
    list: [],
    history: []
};
const mutations = {
    [`countdown/set`](state, {content, timeout}) {
        sender.send("countdown.set", {
            content,
            timeout
        });
    },
    [`countdown/setValue`](state, {field, value}) {
        state[field] = value;
    }
};
const actions = {
    [`countdown/get`]({commit}) {
        sender.send("countdown.get")
            .then((list) => {
                commit(`countdown/setValue`, {
                    field: `list`,
                    value: list
                });
            });
    },
    [`countdown/getBadge`]({commit}) {
        sender.send("cache.getBadge")
            .then((list) => {
                commit(`countdown/setValue`, {
                    field: `history`,
                    value: list
                })
            });
    },
    [`countdown/clear`]({commit}){
        commit(`countdown/setValue`, {
            field: `history`,
            value: []
        });
        sender.send("cache.clearBadge");
    }
};
export default {
    state,
    mutations,
    actions
}