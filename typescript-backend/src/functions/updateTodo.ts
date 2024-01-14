import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/utils'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'

const updateTodo: ValidatedAPIGatewayHandle = async (event) => {
  const id = event.pathParameters.id

  const updatedTodoDdb = await ddbClient.update({
    TableName: todosTableName,
    Key: { todosId: id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': true },
    ReturnValues: 'ALL_NEW'
  })

  const todoObj = updatedTodoDdb.Attributes as Todo
  return formatJSONResponse({ todoObj, id })
}

export const handler = middyfy(updateTodo)
