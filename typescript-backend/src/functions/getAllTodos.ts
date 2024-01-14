import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/reqHandling'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'
import { logger, metrics } from '@utils/tracing'
import { MetricUnits } from '@aws-lambda-powertools/metrics'

const getAllTodos: ValidatedAPIGatewayHandle = async () => {
  logger.info(`Fetching todo items from DynamoDB table ${todosTableName}`)

  const todosDdb = await ddbClient.scan({
    TableName: todosTableName
  })

  metrics.addMetric('getAllTodosFailures', MetricUnits.Count, 0)
  logger.info('Items fetched from DynamoDB')

  const todos = todosDdb.Items as Todo[]
  return formatJSONResponse({ todos })
}

export const handler = middyfy(getAllTodos)
