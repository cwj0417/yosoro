import Vue from "vue"

import iView from 'iview';

import 'iview/dist/styles/iview.css';

import App from "../popup/app"

import store from "../popup/store"

import  "../styles/popup.scss"

import "../components"

new Vue({
    el: `#popup`,
    template: `<App/>`,
    components: {App},
    store
})

Vue.use(iView)

Vue.filter('date', function (input) {
    return new Date(input).toLocaleString();
})