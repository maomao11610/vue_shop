/*
 * @Author: your name
 * @Date: 2021-02-18 14:29:48
 * @LastEditTime: 2021-02-18 19:41:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit 
 * @FilePath: \vue_shop\src\plugins\element.js
 */
import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { Input } from 'element-ui'
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message=Message;