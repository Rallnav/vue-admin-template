<template>
    <div>
        <span v-bind:title="message" v-if="seen">
            需要一些信息用来查看
            <br>
            <input class="new-todo" 
            v-model="newTodo"
            placeholder="What needs to be done?"
            autofocus="on"
            autocomplete="off"
            @keyup.enter="addTodo">
            <section v-show=todos.length  v-cloak>
            <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
            <ol>
                <li v-for="todo in todos"
                    v-show="!todo.completed">
                    {{todo.text}}
                    <el-button v-on:click="reverseMessage(todo.id)">
                        reverse
                    </el-button>
                    <el-button v-on:click="reverseMessage(todo.id)">
                        edit
                    </el-button>
                </li>
            </ol>
            </section>
        </span>
    
    </div>
</template>

<script>
// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}
export default{
            
    data() {
        return {
            uid:3,
            message: '页面加载于 ' + new Date().toLocaleString(),
            msg:"time",
            seen:true,
            todos:[
                {
                    id:0,
                    text:"Todolist",
                    completed:false,
                },
                {
                    id:1,
                    text:"Vue",
                    completed:false,
                    },
                {
                    id:2,
                    text:"Web",
                    completed:false,
                    }
            ],
            newTodo:"",
        }
    },
    methods:{
        reverseMessage:function(id){
            this.todos[id].text = this.todos[id].text.split('').reverse().join('')
        },
        addTodo:function(){
            this.todos.push({
                id:this.uid++,
                text:this.newTodo,
                completed:false
            })
            this.newTodo = ""
        }


    },

    computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },
}

</script>

<style scoped>
[v-cloak] { display: none; }
</style>