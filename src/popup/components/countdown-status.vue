<template>
    <div>
        <module-wrap title="countdown status" v-show="list.length > 0 || history.length > 0">
            <table v-show="list.length > 0" class="table-lg">
                <tr>
                    <th>item</th>
                    <th>countdown</th>
                </tr>
                <tr v-for="item of list">
                    <td>{{item.content}}</td>
                    <td>{{item.countdown}}</td>
                </tr>
            </table>
            <table v-show="history.length > 0" class="table-lg">
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
        </module-wrap>
    </div>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex";
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
