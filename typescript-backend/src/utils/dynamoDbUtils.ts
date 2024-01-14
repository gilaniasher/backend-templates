import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { tracer } from '@utils/tracing'

export const todosTableName = 'TodosTable'

const underlyingDdbClient = (process.env.IS_OFFLINE)
  ? new DynamoDBClient({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDBClient()

export const ddbClient = DynamoDBDocument.from(tracer.captureAWSv3Client(underlyingDdbClient))
