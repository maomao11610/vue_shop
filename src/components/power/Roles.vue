<!--
 * @Author: your name
 * @Date: 2021-02-21 12:24:53
 * @LastEditTime: 2021-02-21 20:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shop\src\components\power\Roles.vue
-->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
 <el-tabel :data="roleList" border stripe>
     <!-- 展开列 -->
     <el-table-column type="expand">
        <template slot-scope="scope">
            <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1==0 ?'bdtop':'','vcenter']" >
                <!-- 一级 -->
                <el-col :span="5">
                    <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级和三级 -->
                <el-col :span="19">
                    <!-- 循环嵌套再次渲染二级和三级 -->
                    <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2==0 ?'' :'bdtop','vcenter']">
                        <el-col :span="6">
                            <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                             <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="18">
                             <el-tag v-for="(item3) in item2.children" :key="item3.id" type="warning" closable @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                        </el-col>
                    </el-row>
                </el-col>
                
            </el-row>
        </template>
     </el-table-column>
<el-tabel-column type="index"></el-tabel-column>
<el-tabel-column label="角色名称" prop="roleName"></el-tabel-column>
<el-tabel-column label="角色描述" prop="roleDesc"></el-tabel-column>
<el-tabel-column label="操作" width="300px" >
    <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger"  size="mini" icon="el-icon-delete">删除</el-button>
        <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
    </template>
</el-tabel-column>
 </el-tabel>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
  title="分配权限"
  :visible.sync="setRightDialogVisible"
  width="50%" @close="setRightDialogClosed">
  <el-tree :data="rightList" :props="treeProps"  show-checkbox node-key="id" default-expand-all :default-checked-keys="defkeys" ref="treeRef"></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleList: [],
      //控制分配权限对话框的显示和隐藏
      setRightDialogVisible:false,
      //所有权限数据
      rightList:[],
      //树形控件
      treeProps:{
        label:'authName',
        children:'children'
      },
      //默认选中的节点ID数组
      defkeys:[],
      roleID:''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      //获取所有角色
      const { data: res } = await this.$http.get("roles")
      if (res.meta.status != 200) {
        return this.$message.error("获取角色列表失败")
      }
      this.roleList = res.data
    },
   async removeRightById(role,rightId){
        //根据Id删除对应的权限
   const confirmResult=  await   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        if(confirmResult!='confirm'){
            return this.$$message.info('取消了删除')
        }
        //发起删除请求
    const{data:res} =  await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
    if(res.meta.status!==200){
        return this.$message.error('删除失败');
    }
   role.children=res.data;
    },
  async  showSetRightDialog(role){
//展示分配权限的弹窗
//获取权限数据
this.roleID=role.id
const {data:res}=await this.$http.get('rights/tree');
if(res.meta.status!=200){
  return this.$message.error('请求权限列表数据失败');
}
//渲染
this.rightList=res.data
//递归调用
this.getLeafKeys(role,this.defkeys)
this.setRightDialogVisible=true;
    },
    getLeafKeys(node,arr){
//通过递归的形式，获取角色下所有的三级目录ID，并保存到数组
if(!node.children){
  return arr.push(node.id)
}
node.children.forEach(item=>this.gstLeafKeys(item,arr))
    },
    setRightDialogClosed(){
      //监听分配权限对话框的关闭
      this.defkeys=[];
    },
   async allotRights(){
      //点击分配权限
      const keys=[...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()]
      const idStr=keys.join(',');
      const{data:res}=  await this.$http.post(`roles/${this.roleID}/rights`,{rids:idStr});
   if(res.meta.status!=200){
     return this.$message.error('更新权限失败');
   }
   return this.$message.success('更新权限成功');
   this.getRolesList();
   this.setRightDialogVisible=false;
    }
    
  },
}
</script>
<style lang="less" scoped>
.el-tag{
    margin: 7px;
}
.bdtop{
    border-top: 1px solid #eee;
}
.bdbottom{
    border-bottom: 1px solid #eee;
}
.vcenter{
    display: flex;
    align-items: center;
}
</style>