import React from "react";
import "./UsersNotFollowedsMovil.scss";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";

export default function UsersNotFollowedsMovil({ user }) {
  const { state, town } = user;

  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

  if (loading) return null;
  if (data === undefined) return null;
  const { getNotFolloweds } = data;

  return (
    <>
      <h4 style={{ color: "#5296a5", marginTop: 10 }}>
        Lomeetos en {town}, {state} que no sigues
      </h4>

      <div className="users-not-followeds-movil">
        {map(getNotFolloweds, (user, index) => (
          <Link
            key={index}
            to={`/${user.username}`}
            className="users-not-followeds-movil__user"
          >
            <Image src={user.avatar || ImageNotFound} avatar />
            <span>{user.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
