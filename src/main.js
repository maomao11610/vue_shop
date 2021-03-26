/*
 * @Author: your name
 * @Date: 2021-02-28 17:49:49
 * @LastEditTime: 2021-03-02 18:04:52
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
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//全局配置axios
import axios from 'axios'
//在response拦截器中取消进度条
axios.interceptors.response.use(config=>{
  Nprogress.done();
  return config;
})
Vue.prototype.$http=axios
//配置请求根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//在request拦截器中展示进度条

axios.interceptors.request.use(config=>{
  Nprogress.start()
  //挂在请求头
  config.headers.Authorization =window.sessionStorage.getItem('token');
  return config;
})
Vue.use(VueQuillEditor);

Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
Vue.filter('dateFormat', function(originVal){
 const dt= new Date(originVal);
 const y=dt.getFullYear();
 const m=(dt.getMonth+1+'').padStart(2,'0');
 const d=(dt.getDate()+'').padStart(2,'0');
 const hh=(dt.getHours()+'').padStart(2,'0');
 const mm=(dt.getMinutes()+'').padStart(2,'0');
 const ss=(dt.getSeconds()+'').padStart(2,'0');
 return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
 