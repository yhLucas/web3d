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
        component: () => import('@/views/HomePage'),
        meta: {requiresAuth: false}
    },
    {
        path: '/User/Center',
        name: 'UserCenter',
        component: () => import('@/views/UserCenter'),
        meta: {requiresAuth: true}
    },
    {
        path: '/User/Login',
        name: 'Login',
        component: () => import('@/views/Login'),
        meta: {requiresAuth: false}
    },
    {
        path: '/User/Register',
        name: 'Register',
        component: () => import('@/views/Register'),
        meta: {requiresAuth: false}
    },
    {
        path: '/VirtualScene',
        name: 'VirtualScene',
        component: () => import('@/views/VirtualScene'),
        meta: {requiresAuth: true}
    }]


const router = createRouter({
    history: createWebHistory(), routes
})

router.beforeEach((to, from, next) => {
    // 如果需要登录但没登录
    if (to.meta.requiresAuth && !store.getters.isLogged) {
        next({name: 'Login', query: {redirect: window.location.pathname}})
        ElMessage.warning("Please login first")
    } else {
        next()
    }
})

export default router