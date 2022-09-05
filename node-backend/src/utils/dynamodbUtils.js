// Hacky workaround since Lambda does not currently support ES6 import of aws-sdk
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const AWS = require('aws-sdk') 

export const todosTableName = 'TodosTable'

export const ddbClient = (process.env.IS_OFFLINE)
  ? new AWS.DynamoDB.DocumentClient({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new AWS.DynamoDB.DocumentClient()
