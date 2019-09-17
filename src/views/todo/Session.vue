<template>

            <el-collapse>
<el-collapse-item>
    <template slot="title">
      一致性 Consistency<sapn style="margin-left:700px">asdf</sapn>
    </template>
            <el-row :gutter="50">
                <el-col :span="8" style="background-color: #d3dce6" bg-purple><div class="grid-content bg-purple">startTime: {{session.startTime}}</div></el-col>
                <el-col :span="8" style="background-color: #e5e9f2"><div class="grid-content bg-purple">endTime: {{session.endTime}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">durantion:{{session.durantion}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">startProgress: {{session.startProgress}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">endProgress: {{session.endProgress}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">finishProgress: {{session.finishProgress}}</div></el-col>
            </el-row>
</el-collapse-item>

            </el-collapse>
</template>

<script>
export default {
    data(){
        return{
            session:{
                    desciption:"一致性 Consistency",
                    id:1,
                    parent:"",
                    startTime: new Date().toLocaleString(),
                    endTime:new Date().toLocaleString(),
                    durantion: 20,
                    startProgress:0,
                    endProgress:20,
                    finishProgress:20
                }
        }
    },
    computed:{
        
    }
}
</script>

<style scoped>

</style>
