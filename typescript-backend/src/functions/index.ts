import { handlerPath } from '@utils/utils'
import { schema as createFnSchema } from './createTodo'

const fullHandler = (entryPoint: string) => {
  return `${handlerPath(__dirname)}/${entryPoint}`
}

const reqSchema = (schema) => {
  return { schemas: { 'application/json': schema } }
}

export default {
  createTodo: {
    handler: fullHandler('createTodo.handler'),
    events: [{ http: { method: 'post', path: 'todo/', cors: true, request: reqSchema(createFnSchema)}}]
  },
  deleteTodo: {
    handler: fullHandler('deleteTodo.handler'),
    events: [{ http: { method: 'delete', path: 'todo/{id}', cors: true } }]
  },
  getAllTodos: {
    handler: fullHandler('getAllTodos.handler'),
    events: [{ http: { method: 'get', path: 'todo/', cors: true } }]
  },
  getTodo: {
    handler: fullHandler('getTodo.handler'),
    events: [{ http: { method: 'get', path: 'todo/{id}', cors: true } }]
  },
  updateTodo: {
    handler: fullHandler('updateTodo.handler'),
    events: [{ http: { method: 'put', path: 'todo/{id}', cors: true } }]
  }
}
