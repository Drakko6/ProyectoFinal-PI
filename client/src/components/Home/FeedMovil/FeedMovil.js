import React, { useState, useEffect } from "react";
import "./FeedMovil.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import { GET_POSTS_FOLLOWEDS } from "../../../gql/post";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalPostMovil/Actions";
import CommentForm from "../../Modal/ModalPost/CommentForm";
import ModalPostMovil from "../../Modal/ModalPostMovil/";

export default function Feed_Movil() {
  const [showModal, setShowModal] = useState(false);
  const [postSelected, setPostSelected] = useState(null);

  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_POSTS_FOLLOWEDS
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  if (data === undefined) return null;
  const { getPostFolloweds } = data;

  const openPost = (post) => {
    setPostSelected(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed-movil">
        {map(getPostFolloweds, (post, index) => (
          <div key={index} className="feed-movil__box">
            <Link to={`/${post.idUser.username}`}>
              <div className="feed-movil__box-user">
                <Image src={post.idUser.avatar || ImageNotFound} avatar />
                <span>{post.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed-movil__box-photo"
              style={{ backgroundImage: `url("${post.file}")` }}
              onClick={() => openPost(post)}
            />

            {post.text ? (
              <div className="feed__box-text">
                <span>{post.idUser.username}: </span>
                {post.text}
              </div>
            ) : null}
            <div className="feed-movil__box-actions">
              <Actions post={post} />
            </div>
            <div className="feed-movil__box-form">
              <CommentForm post={post} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPostMovil
          show={showModal}
          setShow={setShowModal}
          post={postSelected}
        />
      )}
    </>
  );
}
