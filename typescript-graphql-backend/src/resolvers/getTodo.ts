import Todo from '@models/Todo'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'

export default async (id: string) => {
  const todoDdb = await ddbClient.get({
    TableName: todosTableName,
    Key: { todosId: id }
  }).promise()

  if (!todoDdb.Item)
    throw new Error(`Item not found with id: ${id}`)

  return todoDdb.Item as Todo
}
