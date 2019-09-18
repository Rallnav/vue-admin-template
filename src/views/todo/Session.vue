<template>

<el-collapse style="
  border: 0px solid;">
<el-collapse-item class="session-title">
    <template slot="title" style="height:auto">
        <span style="margin-left:5%">{{session.startTime}}</span>
    </template>
            <el-row :gutter="50">
                <el-col class="light-info" :span="8"><div class="grid-content bg-purple">开始时间: {{session.startTime}}</div></el-col>
                <el-col class="dark-info" :span="8" ><div class="grid-content bg-purple">结束时间: {{session.endTime}}</div></el-col>
                <el-col class="light-info" :span="8"><div class="grid-content bg-purple">持续时间:{{durantion}}</div></el-col>
                <el-col class="dark-info" :span="8"><div class="grid-content bg-purple">起始进度: {{session.startProgress}}</div></el-col>
                <el-col class="light-info" :span="8"><div class="grid-content bg-purple">结束进度: {{session.endProgress}}</div></el-col>
                <el-col class="dark-info" :span="8"><div class="grid-content bg-purple">完成进度: {{finishProgress}}</div></el-col>
            </el-row>
    <el-button v-on:click="handleEdit()">
    edit
    </el-button>
</el-collapse-item>

<!-- <el-dialog class="edit-dialog" width="80%" style="top:-12%;" append-to-body @close="reset()"
               :title="editDialogDisplayTitle"
               :visible.sync="editDialogVisible">
      <el-form status-icon label-width="125px"
               :model="editForm" :rules="editFormRules" ref="editForm">
        <el-row style="width:100%;">
          <el-col style="width:40%;">
            <el-form-item prop="id">
              <el-input v-model="editForm.id" type="hidden"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="editForm.username" :disabled="usernameDisable"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input type="password" v-model="editForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPassword">
              <el-input type="password" v-model="editForm.checkPassword"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="width:60%;float:left;">
            <div style="margin-left:5%;">
              <template>
                <div class="grid-content bg-purple" style="margin-left:5%;font-style: oblique;color:blue;margin:5px;">
                  设置角色
                </div>
                <el-transfer style="height:200px;" v-model="editForm.selrolearr" :data="roleData"
                             :titles="['未选角色','已选角色']"></el-transfer>
              </template>
            </div>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="editBtnLoading" @click="editSave()">保存</el-button>
      </span>
    </el-dialog> -->

</el-collapse>
</template>

<script>
export default {
    props: ['initSession'],
    data(){
        return{
            editDialogDisplayTitle:false,
            session:this.initSession,
            session:{
                    description:"一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
                    id:1,
                    parent:"",
                    startTime: new Date().toLocaleString(),
                    endTime:new Date().toLocaleString(),
                    startProgress:0,
                    endProgress:20,
                }
        }
    },
    computed:{
        durantion: function () {
            return this.session.endTime - this.session.startTime
        },
        finishProgress: function () {
            return this.session.endProgress - this.session.startProgress
        }
               
    },
    methods:{
         handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    }
}
</script>

<style lang="scss" scoped>
.session-title {
  width: 50%;
  margin: 0 auto;
  border: 1px solid;
  border-radius:10px 10px 10px 10px;
  background-color: #aaf;
  height:auto;
  overflow:hidden;
}

.light-info{
    background-color: #d3dce6;
    text-align:center
}

.dark-info{
    background-color: #e5e9f2;
    text-align:center
}
</style>
