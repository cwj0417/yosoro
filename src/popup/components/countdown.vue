<template>
    <div>
        <input type="number" placeholder="minutes" v-model="minutes" @keyup.enter="add">
        <input type="text" placeholder="content" v-model="content" @keyup.enter="add">
    </div>
</template>
<style scoped>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    export default {
        data() {
            return {
                minutes: ``,
                content: ``
            }
        },
        methods: {
            add: function () {
            if (this.content && this.minutes) {
                    this.$store.commit(`countdown/set`, {
                        content: this.content,
                        timeout: this.minutes * 60
                    })
                    this.content = ``;
                    this.minutes = ``;
                }
            }
        }
    }
</script>
