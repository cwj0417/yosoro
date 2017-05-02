<template>
    <module-wrap title="todo list" v-show="list.length > 0">
        <table class="table-lg">
            <tr>
                <th>item</th>
                <th>created</th>
                <th>operation</th>
            </tr>
            <tr v-for="(item, index) of list">
                <td>{{item.content}}</td>
                <td>{{item.ts|date}}</td>
                <td>
                    <button @click="remove(index)">clear</button>
                </td>
            </tr>
        </table>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex"
    export default {
        computed: {
            ...mapState({
                list: state => state.todo.list
            })
        },
        methods: {
            ...mapActions({
                getTodo: `todo/get`,
                remove: `todo/remove`
            })
        },
        created() {
            this.getTodo();
        }
    }
</script>