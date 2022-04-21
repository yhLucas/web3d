import {createRouter, createWebHistory} from 'vue-router'
import {store} from "@/store";
import {ElMessage} from "element-plus";
// import {getUser} from "@/serivices/security";
// 引入页面组件

// 此处设置路由对应的页面
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomePage')
    },
    {
        path: '/User/Center',
        name: 'UserCenter',
        component: () => import('@/views/UserCenter')
    },
    {
        path: '/User/Login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/User/Register',
        name: 'Register',
        component: () => import('@/views/Register')
    },
    {
        path: '/VirtualScene',
        name: 'VirtualScene',
        component: () => import('@/views/VirtualScene')
    }]


const router = createRouter({
    history: createWebHistory(), routes
})

router.beforeEach((to, from, next) => {
    const currentUser = store.getters.getToken
    if ((to.name !== 'Login' && to.name !== 'Register') && !currentUser) {
        next({name: 'Login', query: {redirect: window.location.pathname}})
        ElMessage.warning("请登录账号")
    } else {
        next()
    }
})

export default router