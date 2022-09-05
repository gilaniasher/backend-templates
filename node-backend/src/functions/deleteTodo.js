import { formatJSONResponse } from '../utils/utils.js'
import { ddbClient, todosTableName } from '../utils/dynamodbUtils.js'

export const handler = async (event) => {
  const id = event.pathParameters.id

  await ddbClient.delete({
    TableName: todosTableName,
    Key: { todosId: id }
  }).promise()

  return formatJSONResponse(200, { id })
}
