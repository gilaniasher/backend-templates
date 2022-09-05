import { formatJSONResponse } from '../utils/utils.js'
import { ddbClient, todosTableName } from '../utils/dynamodbUtils.js'

export const handler = async (event) => {
  const id = event.pathParameters.id

  const updatedTodoDdb = await ddbClient.update({
    TableName: todosTableName,
    Key: { todosId: id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': true },
    ReturnValues: 'ALL_NEW'
  }).promise()

  return formatJSONResponse(200, { id, todoObj: updatedTodoDdb.Attributes })
}
