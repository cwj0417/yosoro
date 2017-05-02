import Vue from "vue"

import iView from 'iview';

import 'iview/dist/styles/iview.css';

import App from "../options/app"

import  "../styles/popup.scss"

import "../components"

new Vue({
    el: `#options`,
    template: `<App/>`,
    components: {App}
})

Vue.use(iView)