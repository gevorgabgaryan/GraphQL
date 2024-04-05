import { buildSchema } from "graphql";

const schemas = buildSchema(`
    type User {
        id: String!
        firstName: String
        lastName: String
        role: String
        status: String
        email: String!
    }

    type Query {
        users: [User],
        user(id: ID): User
    }

    input UserInput {
      id: ID
      firstName: String
      lastName: String
      role: String
      status: String
      email: String!
      password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        regUser(input: UserInput!): User!
        loginUser(input: LoginInput!): AuthPayload!
        editUser(input: UserInput!): User
        deleteUser(id: ID!): String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

`)

export default schemas;