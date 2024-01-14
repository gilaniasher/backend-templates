import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/utils'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'

const getAllTodos: ValidatedAPIGatewayHandle = async () => {
  const todosDdb = await ddbClient.scan({
    TableName: todosTableName
  })

  const todos = todosDdb.Items as Todo[]
  return formatJSONResponse({ todos })
}

export const handler = middyfy(getAllTodos)
