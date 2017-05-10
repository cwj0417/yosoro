import {word} from "../../libs/bg"
const state = {
    words: {

    }
}
const getters = {

}
const mutations = {
    [`word/setWords`] (state, words) {
        state.words = words
    }
}
const actions = {
    [`word/get`] ({commit}) {
        word.get()
            .then(res => {
                commit(`word/setWords`, res)
            })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}