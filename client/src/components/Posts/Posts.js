import React from "react";
import "./Post.scss";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import PreviewPost from "./PreviewPost";

import { useMediaQuery } from "react-responsive";

export default function Posts({ getPosts }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="posts">
      {getPosts.length > 0 ? (
        <>
          <h1>Posts</h1>

          {isMovil ? (
            <Grid columns={3} className="grid-posts">
              {map(getPosts, (post, index) => (
                <Grid.Column key={index} className="post-movil">
                  <PreviewPost post={post} />
                </Grid.Column>
              ))}
            </Grid>
          ) : (
            <Grid columns={4}>
              {map(getPosts, (post, index) => (
                <Grid.Column key={index} className="post-margin">
                  <PreviewPost post={post} />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <h2>No hay publicaciones aún</h2>
      )}
    </div>
  );
}
