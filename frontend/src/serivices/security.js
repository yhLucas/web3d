function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

export default {
    install(Vue) {
        Vue.prototype.$getUser = getUser
    }
}
export {getUser}