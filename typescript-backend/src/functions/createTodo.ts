import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/reqHandling'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'
import { v4 } from 'uuid'
import { logger, metrics, traceOperation } from '@utils/tracing'
import { getJoke } from '@utils/jokeApi'
import { MetricUnits } from '@aws-lambda-powertools/metrics'

export const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['title', 'description']
} as const

const createTodo: ValidatedAPIGatewayHandle<typeof schema> = async (event) => {
  const todoItem: Todo = {
    todosId: await traceOperation('TodoIdGeneration', v4),
    title: event.body.title,
    description: event.body.description,
    joke: await getJoke(),
    createdAt: new Date().toISOString(),
    status: false
  }

  logger.info(`Preparing to persist the following todo item to the DynamoDB table ${todosTableName}: ${JSON.stringify(todoItem)}`)

  const todoDdb = await ddbClient.put({
    TableName: todosTableName,
    Item: todoItem
  })

  metrics.addMetric('createTodoFailures', MetricUnits.Count, 0)
  logger.info('Item was persisted to DynamoDB')
  return formatJSONResponse({ todoItem, todoDdb })
}

export const handler = middyfy(createTodo)
