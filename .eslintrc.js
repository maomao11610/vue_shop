/*
 * @Author: your name
 * @Date: 2021-02-18 14:25:44
 * @LastEditTime: 2021-02-18 19:10:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  // }
}
