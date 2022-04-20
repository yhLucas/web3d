import {reactive} from "vue";

export const store = reactive({
    logged: false,
    user: {
        username: 'none',
        token: 0
    },

    logIn(username, token) {
        this.logged = true
        this.user.username = username
        this.user.token = token
    },

    isLogged() {
        return this.logged
    },

    getToken() {
        return this.user.token
    },

    getUsername() {
        return this.user.username
    }
})