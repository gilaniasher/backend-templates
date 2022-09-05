import { formatJSONResponse } from '../utils/utils.js'
import { ddbClient, todosTableName } from '../utils/dynamodbUtils.js'

export const handler = async (event) => {
  const id = event.pathParameters.id

  const todoDdb = await ddbClient.get({
    TableName: todosTableName,
    Key: { todosId: id }
  }).promise()

  if (!todoDdb.Item)
    return formatJSONResponse(404, { message: 'Id does not exist' })

  return formatJSONResponse(200, { todoObj: todoDdb.Item, id })
}
