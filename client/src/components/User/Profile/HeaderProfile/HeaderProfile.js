import React from "react";
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from "../../../../gql/follow";

import "./HeaderProfile.scss";

export default function HeaderProfile({ username, auth, handleModal }) {
  const [follow] = useMutation(FOLLOW);

  const [unFollow] = useMutation(UNFOLLOW);

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: { username: username },
  });

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button className="btn-danger" onClick={onUnFollow}>
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button className="btn-action" onClick={onFollow}>
          Seguir
        </Button>
      );
    }
  };

  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: {
          username: username,
        },
      });

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: username,
        },
      });

      refetch(); //recargar pagina
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {username === auth.username ? (
        <Button onClick={() => handleModal("settings")}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}
