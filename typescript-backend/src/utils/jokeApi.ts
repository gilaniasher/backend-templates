import axios from 'axios'
import { logger, metrics, tracer, wrapLatencyMeasurement } from '@utils/tracing'
import { MetricUnits } from '@aws-lambda-powertools/metrics'

/**
 * Accesses the Joke API to get one English joke.
 * Joke API Docs: https://sv443.net/jokeapi/v2/
 * 
 * @returns joke string
 */
export const getJoke =  wrapLatencyMeasurement('JokeApi#GetJoke', async () => {
  try {
    logger.info('Calling JokeApi#GetJoke')
    const res = await axios.get(`https://v2.jokeapi.dev/joke/Any?type=single&safe-mode`)

    if (res.status >= 400)
      throw new Error(`Unsuccessful status code when caling joke API: ${res.status}`)
    else if (res.data.error)
      throw new Error(`JokeApi response indicated error: ${JSON.stringify(res)}`)
    else if (typeof res.data.joke !== 'string')
      throw new Error(`JokeApi did not return a string joke. Returned joke: ${res.data.joke}`)

    if (!res.data.safe)
      metrics.addMetric('JokeAPI#GetJokeUnsafeContent', MetricUnits.Count, 1)

    metrics.addMetric('JokeApi#GetJokeFailures', MetricUnits.Count, 0)
    logger.info(`Response received from joke API: ${JSON.stringify(res.data)}`)

    return res.data.joke as string
  } catch (err) {
    metrics.addMetric('JokeApi#GetJokeFailures', MetricUnits.Count, 1)
    logger.error(`Encountered the following error when calling the joke API: ${err}`)
    tracer.addErrorAsMetadata(err)
    
    // Return placeholder joke in any error scenarios
    return 'How do you stop a bull from charging? Cancel its credit card!'
  }
})
