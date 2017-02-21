<template>
    <div>
        <span class="y-input-wrap y-input-group">
            <span class="y-input-group-addon">
                {{title}}
            </span>
            <input class="y-input" :type="type" :min="min" :max="max" :disabled="disabled" :placeholder="placeholder" :value="value" @input="change" @keyup.enter="enter" >
        </span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['value', 'title', 'type', 'placeholder', 'disabled', 'min', 'max'],
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