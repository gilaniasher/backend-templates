import Todo from '@models/Todo'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import { v4 } from 'uuid'

export default async (title: string, description: string) => {
  const todoItem: Todo = {
    todosId: v4(),
    title,
    description,
    createdAt: new Date().toISOString(),
    status: false
  }

  await ddbClient.put({
    TableName: todosTableName,
    Item: todoItem
  }).promise()

  return todoItem
}
