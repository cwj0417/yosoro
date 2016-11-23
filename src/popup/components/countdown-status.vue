<template>
    <div>
        <table v-show="list.length > 0" class="table-md">
            <tr>
                <th>item</th>
                <th>countdown</th>
                <th>operation</th>
            </tr>
            <tr v-for="item of list">
                <td>{{item.content}}</td>
                <td>{{item.countdown}}</td>
                <td>
                    <button>clear</button>
                </td>
            </tr>
        </table>
        <table v-show="history.length > 0" class="table-sm">
            <tr>
                <th>item</th>
                <th>dispatched</th>
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
<script>
    import {Message} from "../../libs/chrome";
    import {mapState, mapActions} from "vuex";
    let sender = Message.sender;
    export default {
        computed: {
            ...mapState({
                list: state => state.countdown.list,
                history: state => state.countdown.history
            })
        },
        methods: {
            ...mapActions({
                getCountDown: `countdown/get`,
                getBadge: `countdown/getBadge`,
                clearhistory: `countdown/clear`
            })
        },
        created() {
            this.getCountDown();
            this.getBadge();
            setInterval(() => {
                this.getCountDown();
            }, 1000);
        }
    }

</script>
