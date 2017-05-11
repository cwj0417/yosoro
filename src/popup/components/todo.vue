<template>
    <module-wrap title="todo list" v-show="list.length > 0">
        <section>
            <Input placeholder="input your todo" v-model="content" @on-enter="add"
                     class="input-normal">
                <span slot="prepend">
                    todo item
                </span>
            </Input>
        </section>
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
        data() {
            return {
                content: ``
            };
        },
        computed: {
            ...mapState({
                list: state => state.todo.list
            })
        },
        methods: {
            ...mapActions({
                getTodo: `todo/get`,
                remove: `todo/remove`
            }),
            add() {
                if (this.content) {
                    this.$store.dispatch(`todo/add`, this.content);
                    this.content = ``;
                }
            }
        },
        created() {
            this.getTodo();
        }
    }
</script>