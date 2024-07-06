import React from "react";
import defaultImage from "../assets/touch-icon.png";

import "./UserInfoCard.css";

function UserInfoCard({ author, user }) {
  return (
    <div className="userInfoBox">
      <div className="userInfo">
        <h1 className="pageTitle">{author.name}</h1>
        <div className="">
          <p className="body">
            Description:{" "}
            {author.description ? author.description : "I'm a food lover."}
          </p>

          {user && author._id === user._id && (
            <p className="body">Email: {author.email}</p>
          )}
        </div>
      </div>
      <div className="avatarImageWrapper">
        <img
          src={author.image || defaultImage}
          alt={`${author.name}'s profile`}
          className="userAvatarImage"
        />
      </div>
    </div>
  );
}

export default UserInfoCard;
