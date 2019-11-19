<template>
  <el-form :model="session">

    <el-form-item label="计时器" v-if="realTime">
      <time-count :autoStart="true">
      </time-count>
    </el-form-item>
    <el-form-item label="本次记录内容简述">
      <el-input v-model="description"></el-input>
    </el-form-item>
    <el-form-item label="本次记录笔记">
      <el-input v-model="note"></el-input>
    </el-form-item>
    <el-form-item label="时间记录">
      <el-date-picker
        v-model="sessionTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="持续时间">
      <el-row>
        <el-col :span="3">
          <el-input v-model="day">
          </el-input>
        </el-col>
        <el-col :span="2">
          day
        </el-col>
        <el-col :span="3">
          <el-input v-model="hour">
          </el-input>
        </el-col>
        <el-col :span="1">
          :
        </el-col>
        <el-col :span="3">
          <el-input v-model="minute">
          </el-input>
        </el-col>
        <el-col :span="1">
          :
        </el-col>
        <el-col :span="3">
          <el-input v-model="second">
          </el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="进度标记">
      <el-row>
        <el-col span="7"><el-input
          placeholder="请输入本次起始进度"
          v-model.number="startProgress"
          type="number"
          clearable
        /></el-col>
        <el-col span="7"><el-input
          placeholder="请输入本次结束进度"
          v-model.number="endProgress"
          type="number"
          clearable
        /></el-col>
        <el-col span="7"><el-input-number
          v-model="newSessionProgress"
          label="本次完成进度"
        /></el-col>
      </el-row>
    </el-form-item>
    <el-form-item lable="进度标记">

    </el-form-item>

    <span class="dialog-footer">
					<el-button @click="newSessionDialog = false">取 消</el-button>
					<el-button
            type="primary"
            @click="newSessionAdd"
          >确 定</el-button>
				</span>
  </el-form>
</template>

<script>
  import timeCount from "./timeCount"
    export default {
        name: "editSession",
      components:{
        timeCount
      },
      props: {
          realTime:{
            type:Boolean,
            default: false
          },
        session: {
          type: Object,
          default() {
            return {
              description:
              "一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
            id: 1,
            parent: "",
            startTime: new Date(),
            endTime: new Date(),
            duration:0,
            startProgress: 0,
            endProgress: 20
            }
          }
        }
      },
      data(){
          return {
            description:this.session.description,
            note:this.session.note,
            startProgress:this.session.startProgress,
            endProgress:this.session.endProgress,
            duration:this.session.duration,
            sessionTime:[this.session.startTime,
              this.session.endTime
            ],
            day:0,
            hour:0,
            minute:0,
            second:0,
          }
      },
      methods:{
        raise(){
          throw new Error('阿斯蒂芬')
        }
      }
    }
</script>

<style scoped>

</style>
