import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/utils'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'

const deleteTodo: ValidatedAPIGatewayHandle = async (event) => {
  const id = event.pathParameters.id

  const todoDdb = await ddbClient.delete({
    TableName: todosTableName,
    Key: { todosId: id }
  })

  return formatJSONResponse({ todoDdb, id })
}

export const handler = middyfy(deleteTodo)
