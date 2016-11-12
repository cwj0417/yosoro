import Vue from "vue"

import Vuex from "vuex"

import countdown from "./countdown"

import todo from "./todo"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        countdown,
        todo
    }
})