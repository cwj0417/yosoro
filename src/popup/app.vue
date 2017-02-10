<template>
    <div>
        <component v-for="module in modules" :is="module"></component>
    </div>
</template>
<script>
    import countdown from "./components/countdown"
    import countdownStatus from "./components/countdown-status"
    import todo from "./components/todo"
    import todoStatus from "./components/todo-status"
    import dict from "./components/dict"
    import extract from "./components/extract"
    import tabs from "./components/tabs"
    import environment from "./components/environment"
    import memo from "./components/memo"

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
            todoStatus,
            dict,
            extract,
            tabs,
            environment,
            memo
        },
        created() {
            this.$store.commit(`getModules`);
        }
    }
</script>