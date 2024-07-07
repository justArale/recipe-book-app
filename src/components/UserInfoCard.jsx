import React from "react";
import defaultImage from "../assets/touch-icon.png";

import "./UserInfoCard.css";

function UserInfoCard({ author, user }) {
  return (
    <div className="userInfoBox">
      <div className="avatarImageWrapper">
        <img
          src={author.image || defaultImage}
          alt={`${author.name}'s profile`}
          className="userAvatarImage"
        />
      </div>

      <div className="userInfo">
        <h1 className="pageTitle">{author.name}</h1>
        <div className="">
          <p className="mainFont">
            {author.description ? author.description : "I'm a food lover."}
          </p>

          {user && author._id === user._id && (
            <p className="mainFont">Email: {author.email}</p>
          )}
          <p className="mainFont thirdColor" style={{ marginTop: "auto" }}>
            {author.recipes?.length} recipes
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
