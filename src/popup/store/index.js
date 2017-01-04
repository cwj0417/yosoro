import Vue from "vue"

import Vuex from "vuex"

import countdown from "./countdown"

import todo from "./todo"

import extract from "./extract"

import tabs from "./tabs"

import {Message} from "../../libs";
let sender = Message.sender;

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
    state: state,
    mutations: mutations,
    modules: {
        countdown,
        todo,
        extract,
        tabs
    }
})