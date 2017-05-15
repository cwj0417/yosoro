<template>
    <module-wrap title="dictionary">
        <div>
            <i-input title="word" placeholder="input here" type="text" v-model="word" class="input-normal">
                <span slot="prepend">word</span>
            </i-input>
            <div class="info-inline">{{info}}</div>
        </div>
        <div>
            <ol>
                <li v-for="item in results">{{item}}</li>
            </ol>
        </div>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import _ from "lodash"
    import {dict} from "../../libs/cm"
    export default {
        data() {
            return {
                word: ``,
                info: `waiting for your search`,
                results: []
            }
        },
        methods: {
            search: _.debounce(function (word) {
                this.info = `waiting for your search`;
                this.results = [];
                if (word.length > 0) {
                    this.info = `searching...`;
                    dict.search(word)
                            .then((results) => {
                                this.results = results;
                                this.info = `done`;
                            }, (err) => {
                                this.info = err;
                            })
                }
            }, 350)
        },
        watch: {
            word(word) {
                this.info = `typing...`;
                this.search(word);
            }
        }
    }


</script>