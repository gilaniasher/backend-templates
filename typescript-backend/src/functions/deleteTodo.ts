import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/reqHandling'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import { logger, metrics } from '@utils/tracing'
import { MetricUnits } from '@aws-lambda-powertools/metrics'

const deleteTodo: ValidatedAPIGatewayHandle = async (event) => {
  const id = event.pathParameters.id
  logger.info(`Preparing to delete todo item with ID, ${id}, from DynamoDB table ${todosTableName}`)

  const todoDdb = await ddbClient.delete({
    TableName: todosTableName,
    Key: { todosId: id }
  })

  metrics.addMetric('deleteTodoFailures', MetricUnits.Count, 0)
  logger.info('Item was deleted from DynamoDB');
  return formatJSONResponse({ todoDdb })
}

export const handler = middyfy(deleteTodo)
