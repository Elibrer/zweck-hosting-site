const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    country: String
    phoneNumber: String
    enquiries: [String]
  }

  type Query {
    getUsers: [User]
    getUser(_id: ID!): User
  }

  type Mutation {
    addUser(
      firstName: String
      lastName: String
      email: String
      country: String
      phoneNumber: String
      enquiries: [String]
    ): User

    updateUser(
      _id: ID
      firstName: String
      lastName: String
      email: String
      country: String
      phoneNumber: String
      enquiries: [String]
    ): User

    deleteUser(_id: ID!): User
  }
`;

module.exports = typeDefs;
