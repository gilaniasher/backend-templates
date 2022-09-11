import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'

export default async (id: string) => {
  await ddbClient.delete({
    TableName: todosTableName,
    Key: { todosId: id }
  }).promise()

  return id
}
