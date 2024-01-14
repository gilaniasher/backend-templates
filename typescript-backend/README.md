# TypeScript Serverless Backend
This backend uses the Serverless framework to manage Lambda functions and DynamoDB tables. It supports:
* Local server for interacting with Lambdas and local DynamoDB
* Hot reloads (few seconds of delay)
* Code reuse across Lambdas
* Lambda middleware for parsing event body
* Lambda request event body can be validated according to schema
* Easy AWS deployments

## One Time Setup
> **Java Version**: Java 8 or higher is required to run DynamoDB locally.

```
nvm use                    # Use the same Node version as Lambda (Node 20)
npm i
npx sls dynamodb install   # Will install local DynamoDB JARs
aws configure
```

## Running Locally

```
nvm use
npm start             # Locally host Lambdas/DynamoDB defined in serverless.ts
npm run view-table    # GUI for viewing local DynamoDB tables
```

## Adding Functions

Add a new TS file to the `functions` folder representing your new Lambda function.

In the `functions/index.ts` file, export your function's Serverless configuration by specifying things such as the handler path and HTTP verb.

You can optionally provide a schema object which will validate the event body of your Lambda's request object.

```
createTodo: {
  handler: 'fullPath/createTodo.handler',
  events: [{
    http: {
      method: 'post',
      path: 'todo/',
      request: { schemas: { 'application/json': schemaObj } }
    }
  }]
}
```

## Deploying
```
aws configure
npm run deploy
```
