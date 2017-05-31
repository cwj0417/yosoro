<template>
    <module-wrap title="memo">
        <Collapse accordion>
            <Panel v-for="(memo, index) in memos" :name="memo.title" :key="memo.title">
                {{memo.title}}
                <div slot="content">
                    <Tabs>
                        <Tab-pane label="content" icon="eye">
                            <md v-model="memo.content"></md>
                        </Tab-pane>
                        <Tab-pane label="edit" icon="edit">
                            <button @click="del(index)">delete</button>
                            <i-input v-model="memo.title" title="title" style="width:50%">
                                <span slot="prepend">title</span>
                            </i-input>
                            <i-input type="textarea" class="ta" v-model="memo.content" :rows="10">
                            </i-input>
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
        data () {
            return {
                handle: {
                    suc: (msg = "saved...") => {
                        this.$Message.success(msg)
                    },
                    err: (msg = "save failed...") => {
                        this.$Message.error(msg)
                    }
                }
            }
        },
        computed: {
            ...mapState({
                memos: `memo`
            })
        },
        methods: {
            ...mapActions({
                add: `memo/add`,
                del: `memo/delete`,
                modify: `memo/modify`
            })
        },
        mounted() {
            this.$store.dispatch(`memo/get`);
        },
        watch: {
            memos: {
                handler: _.debounce(function (value) {
                    this.modify(value)
                        .then(this.handle.suc, this.handle.err)
                }, 350),
                deep: true
            }
        }
    }
</script>