import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/utils'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'
import { v4 } from 'uuid'

export const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['title', 'description']
} as const

const createTodo: ValidatedAPIGatewayHandle<typeof schema> = async (event) => {
  const todoItem: Todo = {
    todosId: v4(),
    title: event.body.title,
    description: event.body.description,
    createdAt: new Date().toISOString(),
    status: false
  }

  const todoDdb = await ddbClient.put({
    TableName: todosTableName,
    Item: todoItem
  })

  return formatJSONResponse({ todoDdb })
}

export const handler = middyfy(createTodo)
