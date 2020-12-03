import React from "react";
import { size, map } from "lodash";
import { Image } from "semantic-ui-react";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./ListUsers.scss";
import { useHistory } from "react-router-dom";

export default function ListUsers({ users, setShowModal }) {
  const history = useHistory();

  const goToUser = (username) => {
    setShowModal(false);
    history.push(`/${username}`);
  };
  return (
    <div className="list-users">
      {size(users) === 0 ? (
        <p className="list-users_not-users">No se han encontrado usuarios</p>
      ) : (
        map(users, (user, index) => (
          <div
            key={index}
            className="list-users_user"
            onClick={() => goToUser(user.username)}
          >
            <Image src={user.avatar || ImageNotFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
