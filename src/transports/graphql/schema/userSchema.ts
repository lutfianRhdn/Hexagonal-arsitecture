// src/api/graphql/schemas/userSchema.ts
import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    username: String
  }

  type Query {
    getUser(id: ID): User
  }

  type Mutation {
    registerUser(username: String, password: String): User
    loginUser(username: String, password: String): User
  }
`;

export default typeDefs;
