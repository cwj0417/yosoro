<template>
    <div>
        <div v-for="module in list">
            <span>{{module.name}}</span>
            <input type="checkbox" v-model="module.isShown" @change="change"/>
        </div>
    </div>
</template>
<script>
import {sender} from "../libs/cm";
import config from "../config";
export default {
    data() {
        return {
            modules: config.modules,
            list: []
        }
    },
    methods: {
        getList() {
            sender.send(`modules.get`)
            .then((modules) => {
                this.list = this.modules.map(name => ({
                    name: name,
                    isShown: modules.indexOf(name) >= 0
                }));
            });
        },
        change() {
            let modules = this.list.filter(item => item.isShown).map(item => item.name);
            sender.send(`modules.set`, modules);
        }
    },
    created() {
        this.getList();
    }
}
</script>