import { formatJSONResponse } from '../utils/utils.js'
import { ddbClient, todosTableName } from '../utils/dynamodbUtils.js'

export const handler = async () => {
  const todosDdb = await ddbClient.scan({
    TableName: todosTableName
  }).promise()

  return formatJSONResponse(200, { todos: todosDdb.Items })
}
