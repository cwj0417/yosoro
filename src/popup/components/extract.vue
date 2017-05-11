<template>
    <module-wrap title="extract">
        <Collapse>
            <Panel v-for="(value, key) in extracts" :name="key">
                {{key}}
                <div slot="content">
                    <ul>
                        <li v-for="each in value">
                            <a :href="each.url" target="_blank">
                                {{each.content}}
                            </a>
                            <button @click="clear({each})">clear</button>
                        </li>
                    </ul>
                </div>
            </Panel>
        </Collapse>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions, mapGetters} from "vuex";
    export default {
        methods: {
            ...mapActions({
                clear: `extract/clear`
            })
        },
        computed: {
            ...mapGetters([
                `extracts`
            ])
        },
        created() {
            this.$store.dispatch(`extract/getFromStorage`);
        }
    }
</script>