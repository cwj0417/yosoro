<template>
    <div>
        <component v-for="module in modules" :is="module"></component>
    </div>
</template>
<script type="text/ecmascript-6">
    import countdown from "./components/countdown"
    import countdownStatus from "./components/countdown-status"
    import todo from "./components/todo"
    import dict from "./components/dict"
    import extract from "./components/extract"
    import tabs from "./components/tabs"
    import environment from "./components/environment"
    import memo from "./components/memo"
    import word from "./components/word"

    export default {
        data() {
            return {
                greet: `hello`,
                test: `countdown`
            }
        },
        computed: {
            modules() {
                return this.$store.state.modules;
            }
        },
        components: {
            countdown,
            countdownStatus,
            todo,
            dict,
            extract,
            tabs,
            environment,
            memo,
            word
        },
        created() {
            this.$store.commit(`getModules`);
        }
    }
</script>