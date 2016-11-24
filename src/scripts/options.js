import Vue from "vue"

import App from "../options/app"

import  "../styles/popup.scss"

import "../components"

new Vue({
    el: `#options`,
    template: `<App/>`,
    components: {App}
});
