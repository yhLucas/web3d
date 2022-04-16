import {createRouter, createWebHashHistory} from 'vue-router'
// 引入页面组件

import HelloWorld from "@/components/HelloWorld"

// 此处设置路由对应的页面
const routes = [
    // 主页
    {
        path: '/',
        component: HelloWorld
    }
    // 注册

    // 登录

    // 用户后台

    // 虚拟场景
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router