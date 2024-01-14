import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/reqHandling'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'
import { logger, metrics } from '@utils/tracing'
import { MetricUnits } from '@aws-lambda-powertools/metrics'

const getTodo: ValidatedAPIGatewayHandle = async (event) => {
  const id = event.pathParameters.id
  logger.info(`Preparing to fetch todo item with ID, ${id}, from DynamoDB table ${todosTableName}`)

  const todoDdb = await ddbClient.get({
    TableName: todosTableName,
    Key: { todosId: id }
  })

  if (!todoDdb.Item) {
    logger.error('Item was not found in the database')
    return formatJSONResponse({ status: 404, message: 'Id does not exist' })
  }

  const todoObj = todoDdb.Item as Todo

  metrics.addMetric('getTodoFailures', MetricUnits.Count, 0)
  logger.info(`Item fetched from database: ${JSON.stringify(todoObj)}`)
  return formatJSONResponse({ todoObj })
}

export const handler = middyfy(getTodo)
