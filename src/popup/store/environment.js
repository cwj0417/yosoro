import {csSender, environment} from "../../libs/bg";
const state = {
    snow: {
        isOn: false,
        num: 0,
        size: 0,
        speed: 0
    },
    filter: {
        blur: 0,
        grayscale: 0,
        brightness: 0
    }
};
const mutations = {
    [`environment/set`](state) {
        environment.setState(state);
    },
    [`environment/setState`](state, data) {
        for (let [k, v] of Object.entries(data)) {
            state[k] = v;
        }
    }
};
const actions = {
    [`environment/snowSwitch`]({commit}, isOn) {
        csSender.send(`environment.snowSwitch`, isOn);
        commit(`environment/set`);
    },
    [`environment/snowNum`]({commit}, Snow3num) {
        csSender.send(`environment.snowParam`, {Snow3num});
        commit(`environment/set`);
    },
    [`environment/snowSize`]({commit}, Snow3Size) {
        csSender.send(`environment.snowParam`, {Snow3Size});
        commit(`environment/set`);
    },
    [`environment/snowSpeed`]({commit}, Snow3Speed) {
        csSender.send(`environment.snowParam`, {Snow3Speed});
        commit(`environment/set`);
    },
    [`environment/filter`]({commit}, params) {
        csSender.send(`environment.filter`, params);
        commit(`environment/set`);
    },
    [`environment/getState`]({commit}) {
        environment.getState()
            .then((state) => {
                commit(`environment/setState`, state);
                console.log(state)
            }, (err) => {
                console.log(err);
            })
    }
};
export default {
    state,
    mutations,
    actions
}