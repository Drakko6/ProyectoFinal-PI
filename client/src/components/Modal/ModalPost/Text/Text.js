import React from "react";
import "./Text.scss";

export default function Text({ post }) {
  return (
    <div className="text">
      <p>
        <span>{post.idUser.username}</span>
        {post.text}
      </p>
    </div>
  );
}
