import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"

export const store = createStore({
    state: {
        // 存储数据
        username: "yicongyuan",
        token: 123
    },
    getters: {
        // 获取函数
        isLogged: (state) => {
            return state.username != null
        },
        getUsername: (state) => {
            return state.username
        },
        getToken: (state) => {
            return state.token
        }
    },
    mutations: {
        // 更改状态的函数
        login(state, user) {
            console.log(user)
            state.username = user.username
            state.token = user.token
        },
        logout(state) {
            state.username = null
            state.token = null
        }
    },
    plugins: [createPersistedState()]
})