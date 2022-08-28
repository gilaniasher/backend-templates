import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/utils'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'

const getAllTodos: ValidatedAPIGatewayHandle = async (event) => {
  const id = event.pathParameters.id

  const todoDdb = await ddbClient.get({
    TableName: todosTableName,
    Key: { todosId: id }
  }).promise()

  if (!todoDdb.Item)
    return formatJSONResponse({ status: 404, message: 'Id does not exist' })

  const todoObj = todoDdb.Item as Todo
  return formatJSONResponse({ todoObj, id })
}

export const handler = middyfy(getAllTodos)
