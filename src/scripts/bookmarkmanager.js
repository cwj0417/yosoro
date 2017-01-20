import Vue from "vue"

import App from "../bookmarkmanager/app"

import store from '../bookmarkmanager/store'

import  "../styles/popup.scss"

import "../components"

new Vue({
    el: `#bookmarkmanager`,
    template: `<App/>`,
    components: {App},
    store
});