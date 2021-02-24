/*
 * @Author: your name
 * @Date: 2021-02-18 14:25:44
 * @LastEditTime: 2021-02-24 17:26:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

//全局配置axios
import axios from 'axios'
import { Tree } from 'element-ui'
Vue.prototype.$http=axios
//配置请求根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  //挂在请求头
  config.headers.Authorization =window.sessionStorage.getItem('token');
  return config;
})


Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
