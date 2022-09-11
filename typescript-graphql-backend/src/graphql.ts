import { ApolloServer, gql } from 'apollo-server-lambda'

import createTodo from '@resolvers/createTodo'
import deleteTodo from '@resolvers/deleteTodo'
import getAllTodos from '@resolvers/getAllTodos'
import getTodo from '@resolvers/getTodo'
import updateTodo from '@resolvers/updateTodo'

const typeDefs = gql`
  type Todo {
    todosId: ID!
    title: String!
    description: String!
    createdAt: String!
    status: Boolean!
  }

  type Query {
    getAllTodos: [Todo!]!
    getTodo(id: ID!): Todo!
  }

  type Mutation {
    createTodo(title: String!, description: String!): Todo!
    deleteTodo(id: ID!): ID!
    updateTodo(id: ID!): ID!
  }
`

const resolvers = {
  Query: {
    getAllTodos,
    getTodo: (_, args) => getTodo(args.id)
  },
  Mutation: {
    createTodo: (_, args) => createTodo(args.title, args.description),
    deleteTodo: (_, args) => deleteTodo(args.id),
    updateTodo: (_, args) => updateTodo(args.id)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: []
})

export const handler = server.createHandler()
