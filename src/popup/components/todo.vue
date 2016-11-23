<template>
    <div>
        <y-input title="todo item" type="text" placeholder="type your todo" v-model="content" @enter="add" class="input-normal"/>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                content: ``
            };
        },
        methods: {
            add() {
                if (this.content) {
                    this.$store.dispatch(`todo/add`, this.content);
                    this.content = ``;
                }
            }
        }
    }
</script>
