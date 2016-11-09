import Vue from "vue";

import App from "../popup/app";

new Vue({
    el: `#popup`,
    template: `<App/>`,
    components: {App}
});

Vue.filter('date', function (input) {
    return new Date(input).toLocaleString();
});