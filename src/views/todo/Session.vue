<template>

<el-collapse style="
  border: 0px solid;">
<el-collapse-item class="session-title">
    <template slot="title" style="height:auto">
        <span style="margin-left:5%">{{session.startTime}}</span>
    </template>
            <el-row :gutter="50" class="container">
                <el-col class="light-info" :span="8" ><div class="grid-content bg-purple" > 开始时间: {{session.startTime}}</div></el-col>
                <el-col class="dark-info" :span="8" ><div class="grid-content bg-purple" > 结束时间: {{session.endTime}}</div></el-col>
                <el-col class="light-info" :span="8" ><div class="grid-content bg-purple" > 持续时间: {{duration}}</div></el-col>

                </el-row>
                <el-row :gutter="50" type="flex">
                <el-col class="dark-info" :span="8"><div class="grid-content bg-purple" >起始进度: {{session.startProgress}}</div></el-col>
                <el-col class="light-info" :span="8"><div class="grid-content bg-purple" >结束进度: {{session.endProgress}}</div></el-col>
                <el-col class="dark-info" :span="8"><div class="grid-content bg-purple" >完成进度: {{finishProgress}}</div></el-col>
                 </el-row>
                <el-row :gutter="50" type="flex">
                <el-col class="light-info" :span="8"><div class="grid-content bg-purple" >完成速度: {{speed}}</div></el-col>
                <el-col class="dark-info" :span="8"><div class="grid-content bg-purple" >完成效率: {{effecient}}</div></el-col>
                <el-col class="light-info" :span="8"><el-button v-on:click="handleEdit()">
    edit
    </el-button></el-col>
            </el-row>
    
</el-collapse-item>

<el-dialog class="edit-dialog" width="80%" style="top:-12%;" append-to-body @close="reset()"
               :title="editDialogDisplayTitle"
               :visible.sync="editDialogVisible">
      <el-form status-icon label-width="125px"
               :model="editSession" :rules="rules" ref="editForm">
        <el-row style="width:100%;">
          <el-col style="width:40%;">
            <el-form-item prop="id">
              <el-input v-model="editSession.id" type="hidden"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" prop="startTime">
              <el-input v-model="editSession.startTime" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="结束时间：" prop="endTime">
              <el-input v-model="editSession.endTime"></el-input>
            </el-form-item>
            <el-form-item label="起始进度：" prop="startProgress">
              <el-input  v-model="editSession.startProgress"></el-input>
            </el-form-item>
            <el-form-item label="完成进度：" prop="endProgress">
              <el-input  v-model="editSession.endProgress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="editBtnLoading" @click="editSave()">保存</el-button>
      </span>
    </el-dialog>

</el-collapse>
</template>

<script>
export default {
    // props: ['initSession'],
    data(){
        return{
            editDialogDisplayTitle:"edit",
            editDialogVisible:false,
            editBtnLoading:false,
            // session:this.initSession,
            session:{
                    description:"一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
                    id:1,
                    parent:"",
                    startTime: new Date(),
                    endTime:new Date(),
                    startProgress:0,
                    endProgress:20,
                },
            editSession:{
                    description:"一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
                    id:1,
                    parent:"",
                    startTime: new Date().toLocaleString(),
                    endTime:new Date().toLocaleString(),
                    startProgress:0,
                    endProgress:20,
                },
            disable:false,
            rules:{
            }   
        }
    },
    computed:{
        duration: function () {
            return this.session.endTime - this.session.startTime
        },
        finishProgress: function () {
            return this.session.endProgress - this.session.startProgress
        },
        speed:function(){
            return this.duration/this.finishProgress
        },
        effecient:function(){
            return this.finishProgress/this.duration
        }
               
    },
    methods:{
        handleEdit() {
        this.editDialogDisplayTitle = 'edit'
        this.editDialogVisible = true
        this.editSession=JSON.parse(JSON.stringify(this.session))
      
    },
    // 表单重置
      reset() {
        let editForm = this.$refs["editForm"];
        editForm.clearValidate();
        editForm.resetFields();
        // @特殊处理, 针对编辑情况的重置
        // for (let k in this.editForm) {
        //   this.editForm[k] = '';
        // }
      },
      editSave(){
          this.session=JSON.parse(JSON.stringify(this.editSession))
          this.$emit("changeData",this.session)
          this.editDialogVisible = false
      }
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
    align-items: stretch;
    background-color: #e5e9f2;
    text-align:center;
    vertical-align:middle;
}

.dark-info{
    background-color: #d3dce6;
    text-align:center;
    align-self:auto;
}

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1 1 auto;
  .light-info{
    align-items: stretch;
    background-color: #e5e9f2;
    text-align:center;
    vertical-align:middle;
}


}
</style>
