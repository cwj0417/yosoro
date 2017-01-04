<template>
    <div>
        <module-wrap title="extract">
            <tab-set>
                <tab :title="key" v-for="(value, key) in extracts">
                    <ul>
                        <li v-for="each in value">
                            <a :href="each.url" target="_blank">
                                {{each.content}}
                            </a>
                            <button @click="clear({each})">clear</button>
                        </li>
                    </ul>
                </tab>
            </tab-set>
        </module-wrap>
    </div>
</template>
<script>
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