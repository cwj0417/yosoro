<template>
    <div>
        <countdown/>
        <countdown-status/>
        <todo/>
        <todo-status/>
    </div>
</template>
<script>
    import countdown from "./components/countdown"
    import countdownStatus from "./components/countdown-status"
    import todo from "./components/todo"
    import todoStatus from "./components/todo-status"
    export default {
        data() {
            return {
                greet: `hello`
            }
        },
        components: {
            countdown,
            countdownStatus,
            todo,
            todoStatus
        }
    }
</script>