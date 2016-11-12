import Vue from "vue"

import App from "../popup/app"

import store from '../popup/store'

new Vue({
    el: `#popup`,
    template: `<App/>`,
    components: {App},
    store
});

Vue.filter('date', function (input) {
    return new Date(input).toLocaleString();
});