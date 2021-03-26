/*
 * @Author: your name
 * @Date: 2021-03-02 17:28:15
 * @LastEditTime: 2021-03-02 17:38:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\vue.config.js
 */
module.exports={
    chainWebpack:config=>{
        config.when(process.env_NODE_ENV==='production',config=>{
            config.entry('app').clear().add('./src/main-prod.js');
            config.set('externals', {
                vue: 'Vue', 'vue-router': 'VueRouter',
               axios: 'axios',
               lodash: '_',
               echarts: 'echarts',
               nprogress: 'NProgress', 'vue-quill-editor': 'VueQuillEditor'
               })
        })
        config.when(process.env_NODE_ENV==='development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}