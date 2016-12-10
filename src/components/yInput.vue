<template>
    <div>
        <span class="y-input-wrap y-input-group">
            <span class="y-input-group-addon">
                {{title}}
            </span>
            <input class="y-input" :type="type" :placeholder="placeholder" :value="value" @input="change" @keyup.enter="enter" >
        </span>
    </div>
</template>
<script>
    export default {
        props: ['value', 'title', 'type', 'placeholder'],
        methods: {
            change() {
                this.$emit(`input`, arguments[0].target.value);
            },
            enter() {
                this.$emit(`enter`, arguments);
             }
        }
    }

</script>