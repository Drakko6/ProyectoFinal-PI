import React from "react";
import "./ModalPostMovil.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "../ModalPost/Actions";
import Text from "../ModalPost/Text";

import { IS_FOLLOW } from "../../../gql/follow";
import { useQuery } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";

export default function ModalPostMovil({ show, setShow, post }) {
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
    <Modal open={show} onClose={onClose} className="modal-post-movil">
      <Grid>
        <Grid.Row
          className="modal-post-movil__top"
          style={{ backgroundImage: `url("${post.file}")` }}
        ></Grid.Row>
        <Grid.Row className="modal-post-movil__bottom">
          <Text post={post} />
          <Actions post={post} isTheSame={isTheSame} isFollow={isFollow} />
          <Comments post={post} />

          {showCommentForm()}
        </Grid.Row>
      </Grid>
    </Modal>
  );
}
