import { ValidatedAPIGatewayHandle, middyfy, formatJSONResponse } from '@utils/reqHandling'
import { ddbClient, todosTableName } from '@utils/dynamoDbUtils'
import Todo from '@models/Todo'
import { logger, metrics } from '@utils/tracing'
import { MetricUnits } from '@aws-lambda-powertools/metrics'

const updateTodo: ValidatedAPIGatewayHandle = async (event) => {
  const id = event.pathParameters.id
  logger.info(`Preparing to update item with ID, ${id}, in DynamoDB table ${todosTableName}`)

  const updatedTodoDdb = await ddbClient.update({
    TableName: todosTableName,
    Key: { todosId: id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': true },
    ReturnValues: 'ALL_NEW'
  })

  const todoObj = updatedTodoDdb.Attributes as Todo

  metrics.addMetric('updateTodoFailures', MetricUnits.Count, 0)
  logger.info(`Updated item in DynamoDB. New attributes: ${JSON.stringify(todoObj)}`)
  return formatJSONResponse({ todoObj })
}

export const handler = middyfy(updateTodo)
