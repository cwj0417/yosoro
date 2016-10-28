import Vue from
    "vue";

import {
    Message
} from
    "../libs/chrome";


let sender = Message.sender;
let reciever = Message.reciever;

Vue.filter('date', function (input) {
    return new Date(input).toLocaleString();
});

//fns

let countdown = new Vue({
    el: `#countdown`,
    data: {
        minutes: ``,
        content: ``,
        list: [],
        history: []
    },
    methods: {
        add: function () {
            if (this.content && this.minutes) {
                sender.send("countdown.set", {
                    content: this.content,
                    timeout: this.minutes * 60
                });
                this.content = ``;
                this.minutes = ``;
            }
        },
        getCountDown: function () {
            sender.send("countdown.get")
                .then((list) => {
                    this.list = list;
                });
        },
        getBadge: function () {
            sender.send("cache.getBadge")
                .then((list) => {
                    this.history = list;
                });
        },
        clearhistory: function () {
            this.history = [];
            sender.send("cache.clearBadge");
        }
    },
    created: function () {
        this.getCountDown();
        this.getBadge();
        setInterval(this.getCountDown, 1000);
    }
});

let todo = new Vue({
    el: `#todo`,
    data: {
        content: ``,
        list: []
    },
    methods: {
        getTodo: function () {
            sender.send("todo.get")
                .then((list) => {
                    this.list = list;
                })
        },
        remove: function (index) {
            this.list.splice(index, 1);
            sender.send("todo.set", this.list);
        },
        add: function () {
            if (this.content) {
                sender.send("todo.add", this.content)
                    .then(() => {
                        this.content = ``;
                        this.getTodo();
                    });
            }
        }
    },
    created: function () {
        this.getTodo();
    }
});