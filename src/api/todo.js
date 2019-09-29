import request from '../utils/request'

export function getTodos(query) {
  return request({
    url: '/todos/gettodolist',
    method: 'get',
    params: query
  }
  )
}

