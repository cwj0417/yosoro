import Vue from "vue"

import Vuex from "vuex"

import countdown from "./countdown"

import todo from "./todo"

import extract from "./extract"

import tabs from "./tabs"

import environment from "./environment"

import memo from "./memo"

import word from "./word"

import blogBacklog from "./blog-backlog"

import {modules} from "../../libs/bg"

Vue.use(Vuex);

const state = {
    modules: []
};
const mutations = {
    getModules (state) {
        modules.get()
            .then(modules => {
                state.modules = modules
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
        environment,
        memo,
        word,
        blogBacklog
    }
})