<template>
    <div>
        <module-wrap title="environment">
            <tab-set>
                <tab title="snow">
                    isOn <input type="checkbox" v-model="state.snow.isOn"/>
                    <br>
                    <y-input title="number" type="number" placeholder="enter snow number" v-model="state.snow.num"
                             class="input-normal"/>
                    <y-input title="size" type="number" placeholder="enter snow size" v-model="state.snow.size"
                             class="input-normal"/>
                    <y-input title="speed" type="number" placeholder="enter snow speed" v-model="state.snow.speed"
                             class="input-normal"/>
                </tab>
                <tab title="filter">
                    <y-input title="blur" type="range" v-model="state.filter.blur" class="input-normal"/>
                    <y-input title="grayscale" type="range" v-model="state.filter.grayscale" class="input-normal"/>
                    <y-input title="brightness" type="range" v-model="state.filter.brightness" class="input-normal"/>
                </tab>
            </tab-set>
        </module-wrap>
    </div>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex";
    export default {
        computed: {
            ...mapState({
                state: "environment"
            })
        },
        methods: {
            ...mapActions({
                snowSwitch: `environment/snowSwitch`,
                snowNum: `environment/snowNum`,
                snowSize: `environment/snowSize`,
                snowSpeed: `environment/snowSpeed`,
                filter: `environment/filter`,
            })
        },
        mounted() {
            this.$store.dispatch(`environment/getState`);
        },
        watch: {
            [`state.snow.isOn`](value) {
                this.snowSwitch(value);
            },
            [`state.snow.num`](value) {
                this.snowNum(value);
            },
            [`state.snow.size`](value) {
                this.snowSize(value);
            },
            [`state.snow.speed`](value) {
                this.snowSpeed(value);
            },
            [`state.filter.blur`]() {
                this.filter(this.state.filter);
            },
            [`state.filter.grayscale`](value) {
                this.filter(this.state.filter);
            },
            [`state.filter.brightness`](value) {
                this.filter(this.state.filter);
            }
        }
    }
</script>