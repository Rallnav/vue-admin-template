<template>
    <el-container title="任务详细信息">
        <el-header class="item-details">
            <el-row type="flex" class="row-bg">
                <el-col  :span="8">
                <div class="pic" v-if="hasPhoto" :key="todoItem.id"><img :src="todoItem.pic" :οnerrοr="nofind()" ></div>
                <div class="wordpic" v-else>
                    {{todoItem.abstract.substring(0,1)}}
                </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple"> <div class="attribute">
            {{todoItem.id}}
        </div>
        <div class="attribute">
            {{todoItem.abstract}}
        </div>
        <div class="attribute">
            {{todoItem.category}}
        </div> 
        <div class="attribute">
            {{todoItem.endDateGoal}}
        </div> 
        </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light">
              <div class="attribute">
            {{todoItem.difficulty}}
        </div>
        <div class="attribute">
            {{todoItem.importanty}}
        </div>
        <div class="attribute">
            {{todoItem.priority}}
        </div>
        <div class="attribute">
            {{todoItem.repeat}}
        </div>
        <div class="attribute">
            {{todoItem.remind}}
        </div>
      </div></el-col>
            </el-row>        
    </el-header>
    <el-main>
        <el-row>

             <el-col :span="24">
                 <div class="attribute">
            {{todoItem.subtask}}
        </div>
        <div class="attribute">
            {{todoItem.note}}
        </div>
        <div class="attribute">
            {{todoItem.comment}}
        </div>
        <div class="attribute">
                insertTime:"",//插入时间
                finishTime:"",//完成时间
                completed:false,//完成状态
                unit:"页",//进度单位
                finishProgress:"",//已完成进度
                goalProgress:"",//总进度
                percent:"",//完成进度百分比
                remainProgress:"",//剩余进度
                remainNeedTime:"",//剩余时间
                averageSpeed:"",//平均
                durationSum:"",//总持续时间
        </div>
        <div class="attribute">
            {{todoItem.remind}}
        </div>
             </el-col>
  <el-col :span="24">

            <el-collapse>
                <each-session v-for="session in allSessions" 
                :key="session.id"
                :unit="todoItem.unit">
                </each-session>
            </el-collapse>
    </el-col>
    </el-row>
        </el-main>
    </el-container>
</template>

<script>
import session from './Session'

export default {
    name:'item-details',
    props: ['initTodoItem'],
    components:{
        'each-session': session
    },
    data(){
        return{
            todoItem:{
                id:"我是id呀",//项目id
                pic:"",//项目附图
                abstract:"项目梗概",//项目梗概
                category:"项目分类",//项目分类
                endDateGoal:new Date().toLocaleString(),//目标完成时间
                
                difficulty:20,//项目难度
                importanty:4,//项目重要性
                priority:3,//项目紧急性
                repeat:1,//重复时间
                remind:1,//提醒时间
                subtask:[
                    {
                        name:"homework",
                        completed:false
                    }
                ],//子任务，只有名字和完成状态
                note:"",//笔记
                file:"",//关联文件？
                comment:"",//项目评价-完成？
                isHabit:false,//是否习惯->若是自动变更某些属性
                insertTime:"",//插入时间
                finishTime:"",//完成时间
                completed:false,//完成状态
                unit:"页",//进度单位
                finishProgress:"",//已完成进度
                goalProgress:"",//总进度
                percent:"",//完成进度百分比
                remainProgress:"",//剩余进度
                remainNeedTime:"",//剩余时间
                averageSpeed:"",//平均
                durationSum:"",//总持续时间
            },
            hasPhoto:true,
            allSessions:[
                {
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
            ]
        }
    },
    computed:{
        // todoItem:function(){
        //     return {
        //         averageSpeed:"",//平均
        //         durationSum:"",//总持续时间
        //     }
        // }
    },
    methods:{
        nofind(){
            this.hasPhoto=false
        }
    }
}
</script>

<style lang="scss" scoped>
.item-details {
  min-height: 260px;
  width: 70%;
  background-color: #ffffff;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
//   background:url("~@/../static/images/wallhaven-94967.jpg") center center no-repeat ;
//   overflow: hidden;
  border-radius: 30px;
  border: 2px solid;
  text-align:center;
  .pic{
      max-width:185px;
      max-height:260px;
  }
  .wordpic{
      min-width:185px;
      height:260px;
      font-size:200px;
  }
    // .gather-infos{
    //     position: relative;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     margin: 0 auto
    // }
}
</style>