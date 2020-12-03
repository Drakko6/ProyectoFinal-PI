import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
  mutation addLike($idPost: ID!) {
    addLike(idPost: $idPost)
  }
`;

export const IS_LIKE = gql`
  query isLike($idPost: ID!) {
    isLike(idPost: $idPost)
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($idPost: ID!) {
    deleteLike(idPost: $idPost)
  }
`;

export const COUNT_LIKES = gql`
  query countLikes($idPost: ID!) {
    countLikes(idPost: $idPost)
  }
`;
