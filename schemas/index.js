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

    input EditUserInput {
        firstName: String
        lastName: String
        password: String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Mutation {
        regUser(input: UserInput!): User!
        loginUser(email: String!, password: String!): AuthPayload!
        editUser(input: EditUserInput!): User
        deleteUser(id: ID!): String
    }


`)

export default schemas;