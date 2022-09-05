# Node Serverless Backend
This Node backend uses the Serverless framework to manage Lambda functions and DynamoDB tables. It supports:
* Local server for interacting with Lambdas and local DynamoDB
* Hot reloads
* Code reuse across Lambdas
* Easy AWS deployments

## One Time Setup
> **Java Version**: Java 8 or higher is required to run DynamoDB locally.

```
nvm use                    # Use the same Node version as Lambda (Node 16)
npm i
npx sls dynamodb install   # Will install local DynamoDB JARs
```

## Running Locally

```
nvm use
npm start             # Locally host Lambdas/DynamoDB defined in serverless.ts
npm run view-table    # GUI for viewing local DynamoDB tables
```

## Adding Functions

Add a new JS file to the `functions` folder representing your new Lambda function.

In the `serverless-config/functions.yml` file, add your function's Serverless configuration by specifying things such as the handler path and HTTP verb.

## Deploying
```
aws configure
npm run deploy
```
