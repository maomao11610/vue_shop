<!--
 * @Author: your name
 * @Date: 2021-02-18 19:47:45
 * @LastEditTime: 2021-02-18 20:02:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\src\components\Home.vue
-->
<template>
   <el-button type="info" @click="logout">退出</el-button>
</template>
<script>
export default {
    methods:{
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>
<style lang="less" scoped>

</style>