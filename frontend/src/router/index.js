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

// 无需登录的路由组件名
const publicRoutes = ['Login', 'Register']

function needLogged(name) {
    // 如果不在public组件中，说明需要登录
    return publicRoutes.indexOf(name) === -1
}

router.beforeEach((to, from, next) => {
    // 如果需要登录但没登录
    if (needLogged(to.name) && !store.getters.isLogged) {
        next({name: 'Login', query: {redirect: window.location.pathname}})
        ElMessage.warning("Please login first")
    } else {
        next()
    }
})

export default router