import React, { useState } from "react";
import "./PreviewPost.scss";
import { Image, Icon } from "semantic-ui-react";
import ModalPost from "../../Modal/ModalPost";
import ModalPostMovil from "../../Modal/ModalPostMovil";
import { useMediaQuery } from "react-responsive";
import { COUNT_LIKES } from "../../../gql/like";
import { useQuery } from "@apollo/client";

export default function PreviewPost({ post }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const [showModal, setShowModal] = useState(false);

  const { data: dataCount, loading: loadingCount } = useQuery(COUNT_LIKES, {
    variables: {
      idPost: post.id,
    },
  });

  if (loadingCount) return null;
  const { countLikes } = dataCount;

  return (
    <>
      {isTablet && (
        <div className="preview-post_tablet" onClick={() => setShowModal(true)}>
          <Image className="preview-post_image" src={post.file} />
          <Icon name="paw" className="active" />
          {countLikes} {countLikes === 1 ? "Paw" : "Paws"}
        </div>
      )}

      {isMovil && (
        <div className="preview-post_movil" onClick={() => setShowModal(true)}>
          <Image className="preview-post_image" src={post.file} />
          <Icon name="paw" className="active" />
          {countLikes} {countLikes === 1 ? "Paw" : "Paws"}
        </div>
      )}

      {isDesktopOrLaptop && (
        <div className="preview-post" onClick={() => setShowModal(true)}>
          <Image className="preview-post_image" src={post.file} />
          <Icon name="paw" className="active" />
          {countLikes} {countLikes === 1 ? "Paw" : "Paws"}
        </div>
      )}

      {isMovil ? (
        <ModalPostMovil show={showModal} setShow={setShowModal} post={post} />
      ) : (
        <ModalPost show={showModal} setShow={setShowModal} post={post} />
      )}
    </>
  );
}
