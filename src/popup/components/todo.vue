<style scoped lang="scss">
    .filter {
        li {
            display: inline;
            border: 1px solid #ededed;
            cursor: pointer;
        }
        .active {
            background: #ededed;
        }
    }

    .todo-list {
        li {
            word-wrap: break-word;
            word-break: break-all;
        }
        li:hover {
            .cross {
                display: block;
            }
        }
        i:before {
            color: #ccc;
        }
        span {
            transition: all .5s;
        }
        .edit {
            display: none;
            width: 100%;
            padding-left: 5px;
        }
        .done {
            span {
                text-decoration: line-through;
                color: #ccc;
            }
        }
        .editing {
            span {
                display: none;
            }
            .edit {
                display: block;
            }
        }
        .cross {
            padding: 3px 10px;
            display: none;
            cursor: pointer;
            &:hover i:before {
                color: #333;
            }
        }
        .check {
            padding: 3px 7px;
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all .5s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }
</style>
<template>
    <module-wrap title="todo list" v-show="list.length > 0">
        <Row :gutter="16" class="mb">
            <Col span="12">
            <i-input placeholder="input your todo" v-model="content" @on-enter="add">
                <span slot="prepend">
                    todo item
                </span>
            </i-input>
            </Col>
            <Col span="12">
            <i-input placeholder="search any" v-model="search">
                <span slot="prepend">
                    search
                </span>
            </i-input>
            </Col>
        </Row>
        <Row class="mb">
            <ul class="filter">
                <li :class="{active: curTab == 'all'}" @click="curTab = 'all'">All</li>
                <li :class="{active: curTab == 'active'}" @click="curTab = 'active'">Active</li>
                <li :class="{active: curTab == 'completed'}" @click="curTab = 'completed'">Completed</li>
            </ul>
        </Row>
        <Row>
            <ul class="todo-list">
                <transition-group name="list">
                    <li v-for="(item, index) of filteredList" :class="{done: item.done, editing: item.editing}"
                        :key="item">
                        <Row>
                            <Col span="1" class="check">
                            <!--<input class="toggle"-->
                            <!--type="checkbox"-->
                            <!--:checked="item.done"-->
                            <!--@change="item.done = !item.done">-->
                            <Checkbox v-model="item.done" @change.native="toggleActive(item)"></Checkbox>
                            </Col>
                            <Col span="22">
                            <span @dblclick="item.editing = true" @click="showCreate(item.ts)">{{item.content}}</span>
                            <input :value="item.content"
                                   v-focus="item.editing"
                                   @keyup.enter="doneEdit(item, $event)"
                                   @keyup.esc="cancelEdit(item, $event)"
                                   @blur="doneEdit(item, $event)"
                                   class="edit"/>
                            </Col>
                            <Col span="1" class="cross">
                            <Icon type="close-round" @click.native="remove(item)"></Icon>
                            </Col>
                        </Row>
                    </li>
                </transition-group>
            </ul>
        </Row>
    </module-wrap>
</template>
<script type="text/ecmascript-6">
    import {mapState, mapActions} from "vuex"
    import {dateFormat} from "../../libs/util"
    const filter = {
        all: todo => todo,
        active: todo => !todo.done,
        completed: todo => todo.done
    }
    const search = function (content, field) {
        return item => item[field].indexOf(content) > -1
    }
    export default {
        data() {
            return {
                content: ``,
                search: ``,
                curTab: `active`,
                handle: {
                    suc: () => {
                        this.$Message.success("saved...")
                    },
                    err: (msg = "save failed...") => {
                        this.$Message.error(msg)
                    }
                }
            };
        },
        computed: {
            ...mapState({
                list: state => state.todo.list
            }),
            filteredList () {
                return this.list.filter(filter[this.curTab]).filter(search(this.search, 'content'))
            }
        },
        directives: {
            focus (el, {value}, {context}) {
                if (value) {
                    context.$nextTick(() => {
                        el.focus()
                    })
                }
            }
        },
        methods: {
            ...mapActions({
                getTodo: `todo/get`,
                remove: `todo/remove`,
                update: `todo/update`
            }),
            showCreate (time) {
                this.$Message.info(dateFormat(time))
            },
            add() {
                if (this.content) {
                    this.$store.dispatch(`todo/add`, this.content)
                        .then(this.handle.suc, this.handle.err)
                    this.content = ``;
                }
            },
            toggleActive (item) {
                this.update(item)
                    .then(this.handle.suc, this.handle.err)
            },
            doneEdit (item, e) {
                item.content = e.target.value
                item.editing = false
                this.update(item)
                    .then(this.handle.suc, this.handle.err)
            },
            cancelEdit (t, e) {
                e.target.value = t.content
                t.editing = false
            }
        },
        created() {
            this.getTodo();
        }
    }
</script>