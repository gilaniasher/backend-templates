import dynamoDBClient from '../model'
import TodosService from './todosService'

const todoService = new TodosService(dynamoDBClient())
export default todoService
