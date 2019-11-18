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

export function getSession(parentId) {
  return request({
    url: '/todos/getsession/',
    method: 'post',
    data: parentId,
    baseURL: process.env.VUE_APP_BASE_API_HOME
  }
  )
}

export function addSession(session) {
  return request(
    {
      url: '/todos/addsession/',
      method: 'post',
      data: session,
      baseURL: process.env.VUE_APP_BASE_API_HOME
    }
  )
}

export function deleteSession(id) {
  return request(
    {
      url: '/todos/deletesession/',
      method: 'post',
      data: id,
      baseURL: process.env.VUE_APP_BASE_API_HOME
    }
  )
}

export function editSession(update) {
  return request(
    {
      url: '/todos/editsession/',
      method: 'post',
      data: update,
      baseURL: process.env.VUE_APP_BASE_API_HOME
    }
  )
}
