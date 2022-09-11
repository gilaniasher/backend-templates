import { DynamoDB } from 'aws-sdk'

export const todosTableName = 'TodosTable'

export const ddbClient = (process.env.IS_OFFLINE)
  ? new DynamoDB.DocumentClient({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDB.DocumentClient()
