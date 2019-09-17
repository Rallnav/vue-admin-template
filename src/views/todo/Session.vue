<template>

            <el-collapse style="
  border: 0px solid;">
<el-collapse-item class="title">
    <template slot="title">
      {{session.description}}
      <sapn style="margin-left:70%">{{session.startTime}}</sapn>
    </template>
            <el-row :gutter="50">
                <el-col :span="8" style="background-color: #d3dce6;text-align:center" bg-purple><div class="grid-content bg-purple">startTime: {{session.startTime}}</div></el-col>
                <el-col :span="8" style="background-color: #e5e9f2"><div class="grid-content bg-purple">endTime: {{session.endTime}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">durantion:{{session.durantion}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">startProgress: {{session.startProgress}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">endProgress: {{session.endProgress}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">finishProgress: {{finishProgress}}</div></el-col>
            </el-row>
</el-collapse-item>

            </el-collapse>
</template>

<script>
export default {
    data(){
        return{
            session:{
                    description:"一致性 Consistency",
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
               
    }
}
</script>

<style lang="scss" scoped>
.title {
  width: 50%;
  margin: 0 auto;
  border: 1px inset;
  border-radius:30px 50px 0 0;
  background-color: #aaf;
}
</style>
