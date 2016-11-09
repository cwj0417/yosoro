<template>
    <div>
        <table v-show="list.length > 0">
            <tr>
                <th>内容</th>
                <th>时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="item of list">
                <td>{{item.content}}</td>
                <td>{{item.countdown}}</td>
                <td>
                    <button>clear</button>
                </td>
            </tr>
        </table>
        <table v-show="history.length > 0">
            <tr>
                <th>告警</th>
                <th>时间</th>
            </tr>
            <tr v-for="item of history">
                <td>{{item.content}}</td>
                <td>{{item.ts|date}}</td>
            </tr>
            <tr>
                <td colspan="2">
                    <button @click="clearhistory">clear History</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<style>

</style>
<script>
    import {Message} from "../libs/chrome";
    let sender = Message.sender;
    export default{
        data() {
            return {
                list: [],
                history: []
            }
        },
        methods: {
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
        created() {
            this.getCountDown();
            this.getBadge();
            setInterval(this.getCountDown, 1000);
        }
    }
</script>
