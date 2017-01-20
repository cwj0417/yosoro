<template>
    <div>
        <div class="tabset-head">
            <button v-for="title of titles" @click="active(title)">
                {{title}}
            </button>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    import {tabBus} from "./bus"
    export default {
        data: () => ({
            titles: []
        }),
        props: [],
        methods: {
            active(title) {
                tabBus.$emit(`tabset-active`, title);
            },
            getTabs() {
                let titles = [];
                for(let [, each] of Object.entries(this.$children)) {
                    titles.push(each.title);
                }
                this.titles = titles;
                }
        },
        mounted() {
            this.getTabs();
        },
        updated() {
            this.getTabs();
        }
    }
</script>