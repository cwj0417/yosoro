<template>
    <module-wrap title="memo">
        <Collapse accordion>
            <Panel v-for="(memo, index) in memos" :name="memo.title" :key="memo">
                {{memo.title}}
                <div slot="content">
                    <Tabs>
                        <Tab-pane label="content" icon="eye">
                            <md :value="memo.content"></md>
                        </Tab-pane>
                        <Tab-pane label="edit" icon="edit">
                            <button @click="del(index)">delete</button>
                            <i-input :value="memo.title" title="title" style="width:50%" @keyup.native="updateTitle(index, $event.target.value)">
                                <span slot="prepend">title</span>
                            </i-input>
                            <i-input type="textarea" class="ta" :value="memo.content" :rows="10" @keyup.native="updateContent(index, $event.target.value)">
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
                    suc: () => {
                        this.$Message.success("saved...")
                    },
                    err: () => {
                        this.$Message.error("save failed...")
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
                modify: `memo/modify`,
                _updateTitle: `memo/updateTitle`,
                _updateContent: `memo/updateContent`
            }),
            updateTitle: _.debounce(function (index, value) {
                this._updateTitle({index, value}).then(this.handle.suc, this.handle.err)
            }, 350),
            updateContent:  _.debounce(function(index, value) {
                this._updateContent({index, value}).then(this.handle.suc, this.handle.err)
            }, 350)
        },
        mounted() {
            this.$store.dispatch(`memo/get`);
        }
    }
</script>