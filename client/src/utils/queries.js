import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

// get all users
export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
    }
  }
`;



export const GET_USERS_VIDEOS = gql`
  query getUsersVideos {
    getUsersVideos {
      _id
      videoName
      videoPath
      dateUploaded
      user {
        _id
      }
    }
  }
`;


