# Backend Templates
I use serverless REST/GraphQL APIs for a lot of projects and I wanted to put them all in one place. These backend templates offer the following features:
* Local server for Lambdas
* Local DynamoDB tables
* Hot reloading
* Code reuse across Lambda
* Easy AWS deployments
* Request schema validation (for TypeScript)

# Usage
You can run the following commands to add these templates to your project. First run `npm install -g serverless`.

### TypeScript (REST)
```
sls create --template-url https://github.com/gilaniasher/backend-templates/tree/main/typescript-backend --name backend-typescript
```

### TypeScript (GraphQL)
```
sls create --template-url https://github.com/gilaniasher/backend-templates/tree/main/typescript-graphql-backend --name backend-typescript-gql
```

### Python (REST)
```
sls create --template-url https://github.com/gilaniasher/backend-templates/tree/main/python-backend --name backend-python
```

### Node (REST)
```
sls create --template-url https://github.com/gilaniasher/backend-templates/tree/main/node-backend --name backend-node
```
