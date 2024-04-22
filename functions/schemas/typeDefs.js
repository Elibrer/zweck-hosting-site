const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    videos: [Video]
  }

  type Video {
    _id: ID
    videoName: String
    videoPath: String
    user: User
    dateUploaded: String
  }

  type Auth {
    token: ID!
    user: User
  }

type Query {
  me: User
  getUsers: [User]
  getUsersVideos: [Video]
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    uploadVideo(videoName: String!, videoPath: String!, ): Video
    checkVideo(videoName: String!): Boolean!
    deleteVideo(videoId: ID!): Video
  }
`;

module.exports = typeDefs;
