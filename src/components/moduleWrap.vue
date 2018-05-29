<template>
    <div class="module-wrap">
        <section class="module-title" style="cursor: pointer;" @click="toggleFold">
            <span>{{title}}&nbsp;&nbsp;&nbsp;</span>
            <span :style="{transform: foldStyle}">
                <Icon type="arrow-down-b"></Icon>
            </span>
        </section>
        <section class="module-body" v-show="!fold">
            <slot></slot>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import {modules} from "../libs/bg"
    export default {
        data () {
            return {
                fold: false
            }
        },
        computed: {
            foldStyle () {
                return `rotate(${this.fold ? 0 : -180}deg)`
            }
        },
        methods: {
            toggleFold () {
                this.fold = !this.fold
                modules.setActive(this.title, !this.fold)
            }
        },
        props: ['title'],
        mounted () {
            modules.isActive(this.title)
                .then(isActive => {
                    this.fold = !isActive
                })
        }
    }
</script>
<style scoped>
    .arrow {
        cursor: pointer;
        transition: all .5s;
        display: inline-block;
    }
</style>