import React from "react";
import "./ModalPost.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "./Actions";
import Text from "./Text";

import { IS_FOLLOW } from "../../../gql/follow";
import { useQuery } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";

export default function ModalPost({ show, setShow, post }) {
  const {
    idUser: { username },
  } = post;

  const { auth } = useAuth();

  const { data: dataIsFollow, loading: loadingIsFollow } = useQuery(IS_FOLLOW, {
    variables: { username: username },
  });

  const onClose = () => {
    setShow(false);
  };

  if (loadingIsFollow) return null;
  if (dataIsFollow === undefined) return null;
  const { isFollow } = dataIsFollow;

  const showCommentForm = () => {
    if (isFollow || auth.username === username) {
      return <CommentForm post={post} />;
    } else {
      return null;
    }
  };

  const isTheSame = auth.username === username;

  return (
    <Modal open={show} onClose={onClose} className="modal-post">
      <Grid>
        <Grid.Column
          className="modal-post__left"
          width={10}
          style={{ backgroundImage: `url("${post.file}")` }}
        ></Grid.Column>
        <Grid.Column className="modal-post__right" width={6}>
          <Text post={post} />

          <Comments post={post} />
          <Actions post={post} isTheSame={isTheSame} isFollow={isFollow} />
          {showCommentForm()}
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
