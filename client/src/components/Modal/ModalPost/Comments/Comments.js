import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import "./Comments.scss";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import ImageNotFound from "../../../../assets/png/avatar.png";
import { Link } from "react-router-dom";

export default function Comments({ post }) {
  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPost: post.id,
    },
  });

  useEffect(() => {
    startPolling(2000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getComments } = data;

  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link
          key={index}
          className="comment"
          to={`/${comment.idUser.username}`}
        >
          <Image src={comment.idUser.avatar || ImageNotFound} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
