<!--
 * @Author: your name
 * @Date: 2021-02-19 11:31:48
 * @LastEditTime: 2021-02-19 17:27:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\src\components\user\Users.vue
-->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
    <!-- 上搜索按钮区域 -->
  <el-row :gutter="20">
      <el-col :span="8">
          <!-- 搜索区域 -->
      <el-input placeholder="请输入内容"  v-model="queryInfo.query" clearable @clear="getUserList">
    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input>
      </el-col>
      <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
      </el-col>
  </el-row>
  <!-- 列表区域 -->
  <el-table :data="userlist" border stripe>
      <el-table-column type="index" ></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column  label="状态">
          <template slot-scope= "scope"><el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
           </template>
           </el-table-column>
      <el-table-column  label="操作" width="180px">
          <tamplate slot-scope="scope">
<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
<el-button type="danger" icon="el-icon-delete"  size="mini" @click="removeUserById(scope.row.id)"></el-button>
  <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">
     <el-button type="warning" icon="el-icon-setting"  size="mini"></el-button>
    </el-tooltip>
          </tamplate>
      </el-table-column>
  </el-table>
  <!-- 分页按钮 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%" @close="addDialogClosed">
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 编辑信息对话框 -->
<el-dialog
  title="修改用户信息"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClose">
  <el-form ref="editFormRef" :model="editForm" label-width="70px" :rules="editFormRules">
  <el-form-item label="用户名">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email" ></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editForm.mobile" ></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
    data () {
        var checkEmail=(rule,value,cb)=>{
            //自定义校验规则验证邮箱
           const regEmail= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
           if(regEmail.test(value)){
               return cb();
           }
           cb(new Error('请输入合法的邮箱地址'));
        };
         var checkMobile=(rule,value,cb)=>{
            //自定义校验规则验证手机号
           const regMoblie= /^[1][3,4,5,7,8][0-9]{9}$/
           if(regEmail.test(value)){
               return cb();
           }
           cb(new Error('请输入合法的手机号'));

        };
return {
    //获取用户查询参数
    queryInfo:{
        query:'',
        pagenum:1,
        pagesize:2
    },
    userlist:[],
    total:0,
    addDialogVisible:false,
    // 添加用户的表单数据
    addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
    },
    addFormRules:{
        username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
         password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6到 16个字符', trigger: 'blur' }
        ],
                email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {validator:checkEmail,trigger:'blur'}
        ],
                mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator:checkMobile,trigger:'blur'}
        ]
    },
    editDialogVisible:false,
    //查询到的用户信息保存
    editForm:{},
    editFormRules:{
        email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {validator:checkEmail,trigger:'blur'}
        ],
         mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator:checkMobile,trigger:'blur'}
        ]
    }
}
    },
    created () {
//发起数据请求
this.getUserList()
    },
    methods:{
 async getUserList() {
  const {data:res} =await this.$http.get('users',{params:this.queryInfo});
  if(res.meta.status!==200){
      return this.$message.error('获取用户列表失败');
  }
  this.userlist=res.data.users;
  this.total=res.data.total;
},
// 监听页数
handleSizeChange(newSize) {
console.log(newSize);
this.queryInfo.pagesize=newSize;
this.getUserList();
},
// 监听页码
handleCurrentChange(newPage) {
console.log(newPage)
this.queryInfo.pagenum=newPage;
this.getUserList();
},
 async userStateChange(userInfo) {
    //监听switch 开关状态改变
    console.log(userInfo);
 const {data:res}=await   this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
if( res.meta.status!=200){
    userInfo.mg_state=!userInfo.mg_state;
    return this.$message.error('更新状态失败');
}
this.$Message.success('更新状态成功');
    
},
addDialogClosed(){
    //监听对话框关闭
    this.$refs.addFormRef.resetFields();
},
addUser() {
    //添加用户
    //1.预校验
    this.$refs.addFormRef.validate(async valid=>{
        if(!valid) return;
        //2.发起添加请求
   const {data:res}   = await this.$http.post('users',this.addForm);
   if(res.meta.status!=201){
this.$message.error('添加失败');
   }
   this.$message.success('成功添加');
   this.addDialogVisible=false;
   this.getUserList();//刷新
    })
},
async showEditDialog(id) {
    //展示编辑用户对话框
  const{data:res}= await this.$http.get('users/'+id)
  if(res.meta.status!=200){
      return this.$message.error('查询不到用户信息');
  }
  this.editForm=res.data;
    this.editDialogVisible=true;
    
},
editDialogClose() {
    //监听修改用户表单关闭
    this.$refs.editFormRef.resetFields();
},
editUserInfo() {
    //修改用户信息
    this.$refs.editFormRef.validate(async valid=>{
        if(!valid) return;
        //发起修改网络数据请求
     const {data:res} =await  this.$http.put('users/'+this.editForm.id,{
            email:this.editForm.email,
            mobile:this.editForm.mobile
        })
        if(res.meta.status!=200){
           return this.$message.error('修改信息失败');
        }
        this.editDialogVisible=false;
        this.getUserList();
        this.$message.success('更改信息成功');
    })
},
async removeUserById (id){
    //根据ID删除
    //先弹框询问
   const resultConfirm=  await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        //用户点击确认则返回文本confirm  取消返回文本cancle
        if(resultConfirm!='confirm'){
            return this.$message.info('取消删除啦');
        }
  const {data:res} =  await   this.$http.delete('users/'+id)
  if(res.meta.status!=200){
      return this.$message.error('删除用户信息失败');
  }
   this.$message.success('删除成功');
   this.getUserList();

}
    }
}
</script>
<style lang="less" scoped>
</style>