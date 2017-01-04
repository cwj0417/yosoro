<template>
    <div>
        <module-wrap title="tabs">
            <button @click="collect">collect</button>
            <tab-set>
                <tab :title="value.name" v-for="(value, key) in tabs">
                    <input v-model="value.name" @keyup="modify(key, value.name)"/>
                    <button @click="restoreStay({id: key,resTabs: value.tabs})">restore without clear</button>
                    <button @click="restoreBlank({id: key,resTabs: value.tabs})">restore in new window</button>
                    <button @click="restore({id: key,resTabs: value.tabs})">restore</button>
                    <button @click="clear(key)">clear</button>
                    <ul>
                        <li v-for="each of value.tabs">
                            <img style="height: 15px;" :src="each.favIconUrl"/>
                            <a :href="each.url" target="_blank">
                                {{each.title}}
                            </a>
                        </li>
                    </ul>
                </tab>
            </tab-set>
        </module-wrap>
    </div>
</template>
<script>
    import {mapState, mapActions} from "vuex";
    import _ from "lodash";

    import Vue from "vue";

    export default {
        computed: {
            ...mapState({
                tabs: state => state.tabs.dTabs
            })
        },
        methods: {
            ...mapActions({
                collect: `tabs/collect`,
                clear: `tabs/clear`,
            }),
            restoreStay({id, resTabs}) {
                this.$store.dispatch(`tabs/restoreBlank`, {id, resTabs});
            },
            restore({id, resTabs}) {
                this.$store.dispatch(`tabs/restore`, {id, resTabs});
                this.$store.dispatch(`tabs/clear`, id);
            },
            restoreBlank({id, resTabs}) {
                this.$store.dispatch(`tabs/restoreBlank`, {id, resTabs});
                this.$store.dispatch(`tabs/clear`, id);
            },
            modify: _.debounce(function(id, content) {
                this.$store.dispatch(`tabs/modifyName`, {id, content});
            }, 350)
        },
        created() {
            this.$store.dispatch(`tabs/getFromStorage`);
        }
    }


</script>