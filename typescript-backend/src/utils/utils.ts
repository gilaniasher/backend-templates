import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'
import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'

/**
 * These types are needed to provide proper type
 * checking for the Lambda handler and event body
 */
const defaultSchema = {
  type: 'object',
  properties: {}
} as const

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedAPIGatewayHandle<S=typeof defaultSchema> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

/** Middleware for parsing the request body */
export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser())
}

/** Helper function for getting the path to the handler function */
export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`
}

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(response)
  }
}
