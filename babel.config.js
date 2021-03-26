/*
 * @Author: your name
 * @Date: 2021-02-18 14:25:44
 * @LastEditTime: 2021-03-01 16:44:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\babel.config.js
 */
//发布阶段用到的babel插件
const prodplugins =[];
//处于发布模式
if(process.env.NODE_ENV==='production'){
  prodplugins.push('transform-remove-console');
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    //发布产品时候的插件数组
  ...prodplugins
  ]
}
