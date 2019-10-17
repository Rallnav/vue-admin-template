import Mock from 'mockjs'

const data = Mock.mock({
  todos: [
    {
      id: '我是id呀', // 项目id
      pic: '', // 项目附图
      abstract: '项目梗概', // 项目梗概
      category: '项目分类', // 项目分类
      endDateGoal: new Date().toLocaleString(), // 目标完成时间

      difficulty: 20, // 项目难度
      importanty: 4, // 项目重要性
      priority: 3, // 项目紧急性
      repeat: 1, // 重复时间
      remind: 1, // 提醒时间
      subtask: [
        {
          name: 'homework',
          completed: false
        }
      ], // 子任务，只有名字和完成状态
      note: '', // 笔记
      file: '', // 关联文件？
      comment: '', // 项目评价-完成？
      isHabit: false, // 是否习惯->若是自动变更某些属性
      insertTime: '', // 插入时间
      finishTime: '', // 完成时间
      completed: false, // 完成状态
      unit: '页', // 进度单位
      finishProgress: '', // 已完成进度
      goalProgress: '', // 总进度
      percent: '', // 完成进度百分比
      remainProgress: '', // 剩余进度
      remainNeedTime: '', // 剩余时间
      averageSpeed: '', // 平均
      durationSum: '' // 总持续时间
    }
  ]
})

export default [
  {
    url: '/todos/gettodolist',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: data.todos
      }
    }
  }
]
