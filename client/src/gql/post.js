import { gql } from "@apollo/client";

// export const PUBLISH = gql`
//   mutation publish($file: Upload) {
//     publish(file: $file) {
//       status
//       urlFile
//     }
//   }
// `;

export const PUBLISH = gql`
  mutation publish($input: PostInput) {
    publish(input: $input) {
      status
      urlFile
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($username: String!) {
    getPosts(username: $username) {
      id
      idUser {
        name
        username
      }
      file
      typeFile
      createdAt
      text
    }
  }
`;

export const GET_POSTS_FOLLOWEDS = gql`
  query getPostFolloweds {
    getPostFolloweds {
      id
      idUser {
        name
        username
        avatar
      }
      file
      typeFile
      createdAt
      text
    }
  }
`;
