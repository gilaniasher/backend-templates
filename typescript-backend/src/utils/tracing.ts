import { Tracer } from '@aws-lambda-powertools/tracer'
import { Logger } from '@aws-lambda-powertools/logger'
import { Metrics, MetricUnits } from '@aws-lambda-powertools/metrics'

export const logger = new Logger()
export const metrics = new Metrics()
export const tracer = new Tracer()

/**
 * Wrapper function which accepts a function and creates the subsegments for tracing
 * This wrapper will also add the operation's response/thrown errors as metadata
 * 
 * If an error is thrown during execution, it will be thrown for the caller
 * to handle
 * 
 * @param operationName Name for the tracing subsegment/response metadata
 * @param fn Operation being traced. Can be async or sync
 * @returns The result of calling fn() and awaiting the promise if any
 */
export async function traceOperation<T>(operationName: string, fn: () => T) {
  // Create a subsegment on the parent segment to trace this API call
  const parentSegment = tracer.getSegment()
  const apiCallSubsegment = parentSegment.addNewSubsegment(operationName)
  tracer.setSegment(apiCallSubsegment)

  try {
    // Execute operation. Turn operation into a promise if it was not already async
    const res = await Promise.resolve(fn())
    tracer.addResponseAsMetadata(res, operationName)
    metrics.addMetric(`${operationName}Failures`, MetricUnits.Count, 0)
    return res
  } catch (err) {
    // Capture error as metadata and throw error back
    tracer.addErrorAsMetadata(err)
    metrics.addMetric(`${operationName}Failures`, MetricUnits.Count, 1)
    throw err;
  } finally {
    // Close subsegment and set parent segment back to the active one
    apiCallSubsegment.close()
    tracer.setSegment(parentSegment)
  }
}

/**
 * Wrapper function for measuring the latency of an operation
 * 
 * @param operationName Name of operation being timed
 * @param fn Operation to time. Can be sync or async
 * @returns Returns an async function which can be called to execute fn and record latency
 */
export function wrapLatencyMeasurement<T>(operationName: string, fn: () => T) {
  const startTime = Date.now()

  return () => {
    const res = fn()
    const endTime = Date.now()
    metrics.addMetric(`${operationName}Latency`, MetricUnits.Milliseconds, endTime - startTime)

    return res
  }
}
