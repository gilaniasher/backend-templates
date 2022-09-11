# GraphQL TypeScript Serverless Backend
This GraphQL backend uses the Serverless framework to manage Lambda functions and DynamoDB tables. It supports:
* Local server for interacting with Lambdas and local DynamoDB
* Hot reloads (few seconds of delay)
* Code reuse across GraphQL resolvers
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

Add a new resolver TS file to the `resolvers` folder representing your new GraphQL query/mutation.

In the `src/graphql.ts` file, update the `typeDefs` variable to include the schema for the new query/mutation. Then update the `resolvers` variable to point your query/mutation to your resolver function.

## Deploying
```
aws configure
npm run deploy
```

## Example Invocations
The syntax of invoking the GraphQL functions can be a bit weird so I'm leaving some examples here. These can be used with a REST client like Postman which has a tab for GraphQL queries.

```
query {
    getAllTodos {
        todosId
        title
        description
        createdAt
        status
    }
}
```

```
mutation($title: String!, $description: String!) {
    createTodo(title: $title, description: $description) {
        todosId
        title
        description
        createdAt
        status
    }
}

{
  "title": "My custom title",
  "description": "My description"
}
```

