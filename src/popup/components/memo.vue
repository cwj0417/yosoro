<template>
    <div>
        <module-wrap title="memo">
            <tab-set>
                <tab :title="memo.title" v-for="(memo, index) in memos">
                    <button @click="del(index)">delete</button>
                    <y-input v-model="memo.title" title="title" style="width:50%"/>
                    <textarea class="ta" v-model="memo.content" style="height:300px"></textarea>
                </tab>
            </tab-set>
            <button @click="add">+</button>
        </module-wrap>
    </div>
</template>
<script>
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
                handler: _.debounce(function(value) {
                    this.$store.dispatch(`memo/modify`, value);
                }, 350),
                deep: true
            }
        }
    }


</script>