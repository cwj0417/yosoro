<template>
    <module-wrap title="word">
        <Row>
            blank for
        </Row>
        <Row>
            <Tabs>
                <Tab-pane v-for="(value, key) in words" :label="key">
                    <table>
                        <tr>
                            <th>单词</th>
                            <th>中文</th>
                        </tr>
                        <tr v-for="{key, value} in value">
                            <td>{{key}}</td>
                            <td>{{value}}</td>
                        </tr>
                    </table>
                </Tab-pane>
            </Tabs>
        </Row>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex"
    export default {
        computed: {
            ...mapState({
                words: state => state.word.words
            })
        },
        methods: {
            ...mapActions({
                get: `word/get`
            })
        },
        mounted() {
            this.get()
        }
    }
</script>