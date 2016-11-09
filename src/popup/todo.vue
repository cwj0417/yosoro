<template>
    <div>
        <input type="text" v-model="content" @keyup.enter="add" placeholder="todo">
        <table v-show="list.length > 0">
            <tr>
                <th>内容</th>
                <th>时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item, index) of list">
                <td>{{item.content}}</td>
                <td>{{item.ts|date}}</td>
                <td>
                    <button @click="remove(index)">clear</button>
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
        data(){
            return {
                content: ``,
                list: []
            }
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
        created() {
            this.getTodo();
        }
    }
</script>
