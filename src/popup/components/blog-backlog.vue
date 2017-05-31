<style scoped lang="scss">
    .line {
        line-height: 30px;
        padding: 0 5px;
        border-radius: 5px 0 0 5px;
        text-align: center;
        i {
            cursor: pointer;
            height: 30px;
            width: 100%;
            line-height: 30px;
        }
    }

    .showStatus {

    }

    .editAnimate {
        animation: editing 0.2s infinite;
    }

    @keyframes editing {
        25% {
            transform: rotate(-.25deg)
        }
        50% {
            transform: rotate(0deg)
        }
        75% {
            transform: rotate(.25deg)
        }
    }
</style>
<template>
    <module-wrap title="blog backlog">
        <Tabs>
            <Tab-pane label="status" icon="ionic" :class="{editAnimate: editing}">
                <Row class="line">
                    <Col span="11">
                    title:
                    <span v-show="!editing">{{status.blogTitle}}</span>
                    <span v-show="editing">{{edit.blogTitle}}</span>
                    </Col>
                    <Col span="1">
                    <span @click="toggleEdit(false)">
                            <Icon type="close-circled" v-show="editing"></Icon>
                        </span>
                    </Col>
                    <Col span="1">
                    <span @click="toggleEdit(true)">
                            <Icon type="edit" v-show="!editing"></Icon>
                            <Icon type="checkmark-circled" v-show="editing"></Icon>
                        </span>
                    </Col>
                    <Col span="3"
                         style="border: 1px solid #ccc; border-radius: 5px 0 0 5px; border-right: 0 !important;">
                    deadline
                    </Col>
                    <Col span="8">
                    <Date-picker v-show="!editing" type="date" placeholder="deadline" v-model="status.deadLine"
                                 disabled></Date-picker>
                    <Date-picker v-show="editing" type="date" placeholder="deadline" v-model="edit.deadLine"
                                 :options="sunday"></Date-picker>
                    </Col>
                </Row>
                <Row class="showStatus">
                    <Col v-if="editing">
                    <ul>
                        <li v-for="todo in todos" :key="todo" @click="edit.blogTitle = todo">
                            {{todo}}
                        </li>
                    </ul>
                    </Col>
                    <Col v-else>
                    剩余: {{remain}}
                    </Col>
                </Row>
                <Row style="height: 300px;">

                </Row>
            </Tab-pane>
            <Tab-pane label="todos" icon="navicon-round">
                <i-input v-model="inputTodo" type="text" @on-enter="addTodo">
                    <span slot="prepend">
                        todo topic
                    </span>
                </i-input>
                <ul>
                    <li v-for="todo in todos" :key="todo">
                        {{todo}}
                    </li>
                </ul>
            </Tab-pane>
            <Tab-pane label="memos" icon="clipboard">
                <i-input type="textarea" v-model="memos" @on-change="setMemo" placeholder="record your notes here"
                         :rows="10">

                </i-input>
            </Tab-pane>
            <Tab-pane label="references" icon="ios-book">
                <i-input v-model="inputRef" type="text" @on-enter="addRef">
                    <span slot="prepend">
                        todo references
                    </span>
                </i-input>
                <ul>
                    <li v-for="ref in references" :key="ref">
                        {{ref}}
                    </li>
                </ul>
            </Tab-pane>
        </Tabs>
    </module-wrap>
</template>
<script>
    import {mapState, mapActions} from "vuex"
    import _ from "lodash"
    export default {
        data () {
            return {
                editing: false,
                inputTodo: "",
                inputRef: "",
                edit: {
                    blogTitle: "",
                    deadLine: new Date()
                },
                handle: {
                    suc: (msg = "saved...") => {
                        this.$Message.success(msg)
                    },
                    err: (msg = "save failed...") => {
                        this.$Message.error(msg)
                    }
                },
                sunday: {
                    disabledDate (day) {
                        return day.getDay() !== 1
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                set: `blog-backlog/set`
            }),
            setMemo: _.debounce(function () {
                this.set(this.state)
                    .then(this.handle.suc, this.handle.err)
            }, 350),
            addTodo () {
                this.todos.unshift(this.inputTodo)
                this.inputTodo = ""
                this.set(this.state)
                    .then(this.handle.suc, this.handle.err)
            },
            addRef () {
                this.references.unshift(this.inputRef)
                this.inputRef = ""
                this.set(this.state)
                    .then(this.handle.suc, this.handle.err)
            },
            toggleEdit (confirm) {
                if (this.editing) {
                    if (confirm) {
                        this.status.blogTitle = this.edit.blogTitle
                        this.status.deadLine = this.edit.deadLine
                        this.set(this.state)
                            .then(this.handle.suc, this.handle.err)
                    }
                    this.editing = false
                } else {
                    this.edit.blogTitle = this.status.blogTitle
                    this.edit.deadLine = this.status.deadLine
                    this.editing = true
                }
            }
        },
        computed: {
            ...mapState({
                status: state => state.blogBacklog.status,
                todos: state => state.blogBacklog.todos,
                memos: state => state.blogBacklog.memos,
                references: state => state.blogBacklog.references
            }),
            state () {
                return {
                    status: this.status,
                    todos: this.todos,
                    memos: this.memos,
                    references: this.references
                }
            },
            remain () {
                let r = Math.round
                let s = r((this.status.deadLine.valueOf() - Date.now()) / 1000)
                return `${r(s / 86400)}天 ${r((s % 86400) / 3600)}小时`
            }
        },
        mounted() {
            this.$store.dispatch(`blog-backlog/get`)
        }
    }
</script>