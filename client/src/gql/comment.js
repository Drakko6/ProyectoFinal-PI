import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPost
      comment
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($idPost: ID!) {
    getComments(idPost: $idPost) {
      comment
      idUser {
        username
        avatar
      }
    }
  }
`;
