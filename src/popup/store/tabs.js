import {tabs} from "../../libs/bg";
import Vue from "vue";

const state = {
    dTabs: {}
};

const mutations = {
    [`tabs/add`](state, addTabs) {
        let hash = Date.now();
        Vue.set(state.dTabs, hash, {
            name: `新建收纳${new Date().toLocaleString()}`,
            tabs: addTabs
        });
        tabs.stSet(state.dTabs);
    },
    [`tabs/clear`](state, id) {
        Vue.delete(state.dTabs, id);
        tabs.stSet(state.dTabs);
    },
    [`tabs/set`](state, fetchedTabs) {
        Vue.set(state, `dTabs`, fetchedTabs);
    },
    [`tabs/modifyName`](state, {id, content}) {
        Vue.set(state.dTabs[id], `name`, content);
        tabs.stSet(state.dTabs);
    }
};

const actions = {
    [`tabs/collect`]({commit}) {
        return tabs.getCurWindow()
            .then(res => {
                commit(`tabs/add`, res);
            })
    },
    [`tabs/getFromStorage`]({commit}) {
        return tabs.stGet()
            .then(res => {
                commit(`tabs/set`, res);
            })
    },
    [`tabs/clear`]({commit}, id) {
        commit(`tabs/clear`, id);
    },
    [`tabs/restore`]({commit}, {id, resTabs}) {
        for(let {url} of resTabs) {
            tabs.create({url});
        }
    },
    [`tabs/restoreBlank`]({commit}, {id, resTabs}) {
        let url = resTabs.map(({url}) => url);
        chrome.windows.create({url});
    },
    [`tabs/modifyName`]({commit}, {id, content}) {
        commit(`tabs/modifyName`, {id, content})
    }
};

export default {
    state,
    mutations,
    actions
}