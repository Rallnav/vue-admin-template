<template>
    <el-container >
        <el-header class="all-sessions">
            <div class="gather-infos">
                {{todoItem.abstract}}
            </div>
        </el-header>
        <el-main>
            <el-collapse>
            <el-collapse-item v-for="session in allSessions" 
            :key="session.id"
            :title="session.desciption"
            :name="session.id">
            <el-row :gutter="50">
                <el-col :span="8" style="background-color: #909399"><div class="grid-content bg-purple">startTime: {{session.startTime}}</div></el-col>
                <el-col :span="8" style="background-color: #909399"><div class="grid-content bg-purple">endTime: {{session.endTime}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">durantion:{{session.durantion}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">startProgress: {{session.startProgress}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">endProgress: {{session.endProgress}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">finishProgress: {{session.finishProgress}}</div></el-col>
            </el-row>
                <!-- <div>startTime: {{session.startTime}}</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
            </el-collapse-item>
            <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            todoItem:{
                abstract:"任务"
            },

            allSessions:[
                {
                    desciption:"一致性 Consistency",
                    id:1,
                    startTime: new Date().toLocaleString(),
                    endTime:new Date().toLocaleString,
                    durantion: 20,
                    startProgress:0,
                    endProgress:20,
                    finishProgress:20
                }
            ]
        }
    },
    computed:{
        
    }
}
</script>

<style lang="scss" scoped>
.all-sessions {
  min-height: 100%;
  width: 100%;
  background-color: #909399;
//   background:url("~@/../static/images/wallhaven-94967.jpg") center center no-repeat ;
  overflow: hidden;
  border-radius: 30px;
  border: 2px solid;
  text-align:center;
    .gather-infos{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto
    }
}
</style>