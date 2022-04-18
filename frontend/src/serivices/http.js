import axios from 'axios'
import {ElLoading} from 'element-plus'


export default {
    install(Vue) {
        const api = axios.create({
            baseURL: "/api",
            timeout: 500000,
        })

        Vue.prototype.$http = api
        Vue.prototype.$loading = (options) => ElLoading.service(options || {fullscreen: true})
    }
}