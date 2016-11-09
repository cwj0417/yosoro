<template>
    <div>
        <countdown/>
        <countdown-status/>
        <todo/>
    </div>
</template>
<style>

</style>
<script>
    import countdown from "./countdown";
    import countdownStatus from "./countdown-status";
    import todo from "./todo";
    export default {
        data() {
            return {
                greet: `hello`
            }
        },
        components: {
            countdown,
            countdownStatus,
            todo
        }
    }
</script>