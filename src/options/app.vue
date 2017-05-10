<template>
    <div>
        <div v-for="module in list">
            <span>{{module.name}}</span>
            <input type="checkbox" v-model="module.isShown" @change="change"/>
        </div>
        <div>
            <button @click="axport">export</button>
            <button @click="ymport">import</button>
            <textarea v-model="data" style="width:100px;height:100px;resize:none;"
                      @focus="$event.target.select()"></textarea>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {sender} from "../libs/cm";
    import config from "../config";
    import {storage} from "../libs/bg";
    export default {
        data() {
            return {
                modules: config.modules,
                list: [],
                data: ""
            }
        },
        methods: {
            getList() {
                sender.send(`modules.get`)
                        .then((modules) => {
                            console.log(modules)
                            this.list = this.modules.map(name => ({
                                name: name,
                                isShown: modules.indexOf(name) >= 0
                            }));
                        });
            },
            change() {
                let modules = this.list.filter(item => item.isShown).map(item => item.name);
                sender.send(`modules.set`, modules);
            },
            axport() {
                storage.getAll()
                        .then(data => {
                            this.data = JSON.stringify(data);
                        })
            },
            ymport() {
                try {
                    this.data = JSON.parse(this.data);
                }
                catch (e) {
                }
                if (typeof this.data == "object") {
                    storage.setAll(this.data)
                            .then(res => {
                                console.log(res);
                            })
                }
                this.data = JSON.stringify(this.data)
            }
        },
        created() {
            this.getList();
        }
    }
</script>