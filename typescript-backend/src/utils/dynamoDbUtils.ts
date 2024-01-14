import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

export const todosTableName = 'TodosTable'

export const ddbClient = (process.env.IS_OFFLINE)
  ? DynamoDBDocument.from(new DynamoDBClient({ region: 'localhost', endpoint: 'http://localhost:8000' }))
  : DynamoDBDocument.from(new DynamoDBClient())
