import { buildSchema } from "graphql";

const schemas = buildSchema(`
    type User {
        id: String!
        firstName: String
        lastName: String
        role: String!
        status: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        regUser(email: String!, password: String!, firstName: String, lastName: String): User!
    }
`)

export default schemas;