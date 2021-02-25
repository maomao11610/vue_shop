/*
 * @Author: your name
 * @Date: 2021-02-18 14:25:44
 * @LastEditTime: 2021-02-24 19:52:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import '../assets/css/global.css'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vaue'
import Params from '../components/goods/Params.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    redirect:'/welcome',
    children:[
     {
      path : '/welcome',
      component:Welcome
     },
     {
       path: '/users',
       component: Users
     },
     {
       path:'/rights',
       component:Rights
     },
     {
      path:'/roles',
      component:Roles
    },
    {
      path:'/categories',
      component:Cate
    },{
      path:'/params',
      component:Params
    }
     
    ]
  }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
