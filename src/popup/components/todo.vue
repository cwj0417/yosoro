<template>
    <div>
        <input type="text" v-model="content" @keyup.enter="add" placeholder="todo">
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return {
                content: ``
            }
        },
        methods: {
            add: function () {
                if (this.content) {
                    this.$store.dispatch(`todo/add`, this.content);
                    this.content = ``;
                }
            }
        }
    }
</script>
