<template>
    <module-wrap title="memo">
        <Collapse accordion>
            <Panel v-for="(memo, index) in memos">
                {{memo.title}}
                <div slot="content">
                    <Tabs>
                        <Tab-pane label="content" icon="eye">
                            <md v-model="memo.content"></md>
                        </Tab-pane>
                        <Tab-pane label="edit" icon="edit">
                            <button @click="del(index)">delete</button>
                            <y-input v-model="memo.title" title="title" style="width:50%"/>
                            <textarea class="ta" v-model="memo.content" style="height:300px"></textarea>
                        </Tab-pane>
                    </Tabs>
                </div>
            </Panel>
        </Collapse>
        <button @click="add">+</button>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex"
    import _ from "lodash"
    export default {
        computed: {
            ...mapState({
                memos: `memo`
            })
        },
        methods: {
            ...mapActions({
                add: `memo/add`,
                del: `memo/delete`
            })
        },
        mounted() {
            this.$store.dispatch(`memo/get`);
        },
        watch: {
            memos: {
                handler: _.debounce(function (value) {
                    this.$store.dispatch(`memo/modify`, value);
                }, 350),
                deep: true
            }
        }
    }
</script>