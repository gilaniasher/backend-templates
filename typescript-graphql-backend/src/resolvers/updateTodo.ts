import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'

export default async (id: string) => {
  await ddbClient.update({
    TableName: todosTableName,
    Key: { todosId: id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': true }
  }).promise()

  return id
}
