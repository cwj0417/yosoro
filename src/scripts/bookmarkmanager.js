import Vue from "vue"

import iView from 'iview';

import 'iview/dist/styles/iview.css';

import App from "../bookmarkmanager/app"

import store from '../bookmarkmanager/store'

import  "../styles/popup.scss"

import "../components"

new Vue({
    el: `#bookmarkmanager`,
    template: `<App/>`,
    components: {App},
    store
})

Vue.use(iView)