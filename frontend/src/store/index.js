import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"

export const store = createStore({
    state: {
        // 存储数据
        username: null,
        token: null
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