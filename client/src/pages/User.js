import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../gql/post";
import { size } from "lodash";
import { useParams } from "react-router-dom";
import Profile from "../components/User/Profile";
import Posts from "../components/Posts";

export default function User() {
  const { username } = useParams();

  const { data, loading, startPolling, stopPolling } = useQuery(GET_POSTS, {
    variables: {
      username,
    },
  });

  useEffect(() => {
    //TO DO: ESTO CONSUME RECURSOS DEL SERVIDOR
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  if (data === undefined) return null;
  const { getPosts } = data;

  return (
    <>
      <Profile username={username} totalPosts={size(getPosts)} />
      <Posts getPosts={getPosts} />
    </>
  );
}
