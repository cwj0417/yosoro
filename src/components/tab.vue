<template>
    <div v-show="active">
        <slot></slot>
    </div>
</template>
<script>
    import {tabBus} from "./bus"
    export default {
        data: () => ({
            active: false
        }),
        props: ['title'],
        mounted() {
            tabBus.$on(`tabset-active`, title => {
                this.active = this.title === title;
            })
        }
    }
</script>