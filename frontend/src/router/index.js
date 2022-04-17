import {createRouter, createWebHashHistory} from 'vue-router'
// 引入页面组件
import HomePage from "@/components/HomePage";
import UserCenter from "@/components/UserCenter";
import VirtualScene from "@/components/VirtualScene";
import Login from "@/components/Login";
import Register from "@/components/Register";

// 此处设置路由对应的页面
const routes = [{
    path: '/', component: HomePage
}, {
    path: '/User/Center', component: UserCenter
}, {
    path: '/User/Login', component: Login
}, {
    path: '/User/Register', component: Register
}, {
    path: '/VirtualScene', component: VirtualScene
}]

const router = createRouter({
    history: createWebHashHistory(), routes
})

export default router