import type { AWS, AwsArn } from '@serverless/typescript'
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

const iamManagedPolicies: AwsArn[] = [
  'arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess'
]

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
    tracing: {
      apiGateway: true,
      lambda: 'PassThrough',
    },
    iam,
    iamManagedPolicies,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      POWERTOOLS_SERVICE_NAME: 'BackendTemplateTodoServiceTypeScript',

      // Tracer-specific env variables
      POWERTOOLS_TRACE_ENABLED: 'true',
      POWERTOOLS_TRACER_CAPTURE_RESPONSE: 'true',
      POWERTOOLS_TRACER_CAPTURE_ERROR: 'true',
      POWERTOOLS_TRACER_CAPTURE_HTTPS_REQUESTS: 'true',

      // Logger-specific env variables
      POWERTOOLS_LOG_LEVEL: 'INFO',
      POWERTOOLS_LOGGER_LOG_EVENT: 'true',

      // Metrics-specific env variables
      POWERTOOLS_METRICS_NAMESPACE: 'BackendTemplateTodoServiceTypeScript',
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
      exclude: [],
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
