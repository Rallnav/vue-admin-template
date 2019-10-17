import request from '@/utils/request'

export function getTodos(query) {
  return request({
    url: '/todos/gettodolist/',
    method: 'post',
    data: query,
    baseURL: process.env.VUE_APP_BASE_API_HOME
  }
  )
}

export function addNewTodo(todo) {
  return request(
    {
      url: '/todos/addtodo/',
      method: 'post',
      data: todo,
      baseURL: process.env.VUE_APP_BASE_API_HOME
    }
  )
}

export function deleteTodo(id) {
  return request(
    {
      url: '/todos/deletetodo/',
      method: 'post',
      data: id,
      baseURL: process.env.VUE_APP_BASE_API_HOME
    }
  )
}

export function changeStatus(update) {
  return request(
    {
      url: '/todos/edittodo/',
      method: 'post',
      data: update,
      baseURL: process.env.VUE_APP_BASE_API_HOME
    }
  )
}
