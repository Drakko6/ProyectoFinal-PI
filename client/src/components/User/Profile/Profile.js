import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Profile.scss";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm";
import Followers from "./Followers";
import { useMediaQuery } from "react-responsive";

export default function Profile({ username, totalPosts }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const { auth } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });
  if (loading) return null;
  if (error) return <UserNotFound />;

  const { getUser } = data;

  const handleModal = (type) => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar foto de perfil");
        setChildrenModal(
          <AvatarForm setShowModal={setShowModal} auth={auth} />
        );
        setShowModal(true);
        break;
      case "settings":
        setTitleModal("");
        setChildrenModal(
          <SettingsForm
            setShowModal={setShowModal}
            setChildrenModal={setChildrenModal}
            setTitleModal={setTitleModal}
            userInfo={getUser}
            refetch={refetch}
          />
        );
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      {isMovil ? (
        <Grid className="profile-movil">
          <Grid.Column width={4} className="profile_left__movil">
            <Image
              src={getUser.avatar ? getUser.avatar : ImageNotFound}
              avatar
              onClick={() =>
                username === auth.username && handleModal("avatar")
              }
            />
          </Grid.Column>
          <Grid.Column width={12} className="profile_right__movil">
            <HeaderProfile
              username={username}
              auth={auth}
              handleModal={handleModal}
            />

            <div className="other">
              <p className="name">{getUser.name}</p>
              {getUser.breed && (
                <p className="breed">
                  <span>Raza:</span> {getUser.breed}
                </p>
              )}

              {getUser.years || getUser.months ? (
                <p className="age">
                  <span>Edad: </span>

                  {getUser.years > 0 && <>{getUser.years} años </>}

                  {getUser.months > 0 && <>{getUser.months} meses</>}
                </p>
              ) : null}

              {getUser.owner && (
                <p className="owner">
                  <span>Humano</span>: {getUser.owner}
                </p>
              )}

              {getUser.description && (
                <p className="description">{getUser.description}</p>
              )}
            </div>
          </Grid.Column>
          <Followers username={username} totalPosts={totalPosts} />
        </Grid>
      ) : (
        <Grid className="profile">
          <Grid.Column width={5} className="profile_left">
            <Image
              src={getUser.avatar ? getUser.avatar : ImageNotFound}
              avatar
              onClick={() =>
                username === auth.username && handleModal("avatar")
              }
            />
          </Grid.Column>
          <Grid.Column width={11} className="profile_right">
            <HeaderProfile
              username={username}
              auth={auth}
              handleModal={handleModal}
            />
            <Followers username={username} totalPosts={totalPosts} />
            <div className="other">
              <p className="name">{getUser.name}</p>
              {getUser.breed && (
                <p className="breed">
                  <span>Raza:</span> {getUser.breed}
                </p>
              )}

              {getUser.years || getUser.months ? (
                <p className="age">
                  <span>Edad: </span>

                  {getUser.years > 0 && <>{getUser.years} años </>}

                  {getUser.months > 0 && <>{getUser.months} meses</>}
                </p>
              ) : null}

              {getUser.owner && (
                <p className="owner">
                  <span>Humano</span>: {getUser.owner}
                </p>
              )}

              {getUser.description && (
                <p className="description">{getUser.description}</p>
              )}
            </div>
          </Grid.Column>
        </Grid>
      )}
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
