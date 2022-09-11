import Todo from '@models/Todo'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'

export default async () => {
  const todosDdb = await ddbClient.scan({
    TableName: todosTableName
  }).promise()

  return todosDdb.Items as Todo[]
}
