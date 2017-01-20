import Vue from "vue"

import Vuex from "vuex"

import countdown from "./countdown"

import todo from "./todo"

import extract from "./extract"

import tabs from "./tabs"

import environment from "./environment"

import {sender} from "../../libs/cm";

Vue.use(Vuex);

const state = {
    modules: []
};
const mutations = {
    getModules(state) {
        sender.send(`modules.get`)
            .then((modules) => {
                state.modules = modules;
            });
    }
};

export default new Vuex.Store({
    state,
    mutations,
    modules: {
        countdown,
        todo,
        extract,
        tabs,
        environment
    }
})