import { formatJSONResponse } from '../utils/utils.js'
import { ddbClient, todosTableName } from '../utils/dynamodbUtils.js'
import { v4 } from 'uuid'

export const handler = async (event) => {
  const { title, description } = JSON.parse(event.body)
  const todosId = v4()

  const todoItem = {
    todosId,
    title,
    description,
    createdAt: new Date().toISOString(),
    status: false
  }

  await ddbClient.put({
    TableName: todosTableName,
    Item: todoItem
  }).promise()

  return formatJSONResponse(200, { todosId })
}
