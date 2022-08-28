import type { AWS } from '@serverless/typescript'
import { createTodo, getTodo, getAllTodos, updateTodo, deleteTodo } from '@functions/todos'

const functions = {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
}

const iam = {
  role: {
    statements: [{
      Effect: 'Allow',
      Action: [
        'dynamodb:DescribeTable',
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
      ],
      Resource: 'arn:aws:dynamodb:us-west-2:*:table/TodosTable'
    }]
  }
}

const todosDynamoDbTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'TodosTable',
    AttributeDefinitions: [{
      AttributeName: 'todosId',
      AttributeType: 'S',
    }],
    KeySchema: [{
      AttributeName: 'todosId',
      KeyType: 'HASH'
    }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
}

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '3',

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    iam,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    }
  },

  resources: {
    Resources: {
      TodosTable: todosDynamoDbTable
    }
  },

  functions, 
  package: { individually: true },

  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true
      },
      stages: 'dev'
    }
  }
}

module.exports = serverlessConfiguration
