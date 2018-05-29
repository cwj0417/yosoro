<template>
    <module-wrap title="tabs">
        <button @click="collect" style="margin-bottom: 8px;">collect</button>
        <Collapse accordion>
            <Panel v-for="(value, key) in tabs" :name="value.name" :key="value">
                {{value.name}}
                <div slot="content">
                    <input :value="value.name" @keyup.enter="modify(key, $event)"/>
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
                </div>
            </Panel>
        </Collapse>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex";

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
            modify: function (id, evt) {
                let content = evt.target.value;
                this.$store.dispatch(`tabs/modifyName`, {id, content});
            }
        },
        created() {
            this.$store.dispatch(`tabs/getFromStorage`);
        }
    }


</script>