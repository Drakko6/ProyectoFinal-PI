import React, { useState } from "react";
import "./Actions.scss";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  IS_LIKE,
  DELETE_LIKE,
  COUNT_LIKES,
} from "../../../../gql/like";

export default function Actions({ post, isTheSame, isFollow }) {
  const [loadingAction, setLoadingAction] = useState(false);

  const [deleteLike] = useMutation(DELETE_LIKE);

  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKES, {
    variables: {
      idPost: post.id,
    },
  });

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: {
      idPost: post.id,
    },
  });

  const [addLike] = useMutation(ADD_LIKE);

  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({
        variables: {
          idPost: post.id,
        },
      });

      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          idPost: post.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }

    setLoadingAction(false);
  };

  const onAction = () => {
    // isLike ? onDeleteLike : onAddLike

    if (isTheSame || isFollow) {
      if (!loadingAction) {
        if (isLike) {
          onDeleteLike();
        } else {
          onAddLike();
        }
      }
    }
  };

  if (loading || loadingCount) return null;
  const { isLike } = data;
  const { countLikes } = dataCount;

  return (
    <div className="actions">
      {isFollow || isTheSame ? (
        <>
          {isLike ? (
            <Icon
              name="paw"
              className="active"
              // className={isLike ? "like active" : "like"}
              onClick={onAction}
            />
          ) : (
            <Icon
              name="paw"
              className="inactive"
              // className={isLike ? "like active" : "like"}
              onClick={onAction}
            />
          )}
        </>
      ) : (
        <div className="actions-inactive">
          {isLike ? (
            <Icon
              name="paw"
              className="active"
              // className={isLike ? "like active" : "like"}
              onClick={onAction}
            />
          ) : (
            <Icon
              name="paw"
              className="inactive"
              // className={isLike ? "like active" : "like"}
              onClick={onAction}
            />
          )}
        </div>
      )}
      {countLikes} {countLikes === 1 ? "Paw" : "Paws"}
    </div>
  );
}
