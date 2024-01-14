import type { AWS } from '@serverless/typescript'
import functions from '@functions/index'

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
      Resource: [
        {'Fn::GetAtt': ['TodosDynamoDBTable', 'Arn']}
      ]
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
  service: 'ts-backend',
  frameworkVersion: '3',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
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
      TodosDynamoDBTable: todosDynamoDbTable
    }
  },

  functions,

  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb'
  ],

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [
        '@aws-sdk/client-dynamodb',
        '@aws-sdk/lib-dynamodb'
      ],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start:{
        port: 8000,
        inMemory: true,
        migrate: true
      },
      stages: 'dev'
    }
  }
}

module.exports = serverlessConfiguration
