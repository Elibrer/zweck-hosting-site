import { gql } from "@apollo/client";

// add user
export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        password
        email
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        _id
      }
    }
  }
`;


export const UPLOAD_VIDEO = gql`
  mutation UploadVideo($videoName: String!, $videoPath: String!) {
    uploadVideo(videoName: $videoName, videoPath: $videoPath) {
      _id
      videoName
      videoPath
      user {
        _id
      }
    }
  }
`;


export const CHECK_VIDEO = gql`
  mutation CheckVideo($videoName: String!) {
    checkVideo(videoName: $videoName)
  }
`;

