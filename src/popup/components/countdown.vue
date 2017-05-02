<template>
    <module-wrap title="reminder-countdown">
        <y-input title="countdown" type="number" placeholder="input minutes" v-model="minutes" @enter="add"
                 class="input-normal"/>
        <y-input title="content" type="text" placeholder="your reminder content" v-model="content" @enter="add"
                 class="input-normal"/>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
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
