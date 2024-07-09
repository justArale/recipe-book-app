import React from "react";
import defaultAvatar from "../assets/defaultAvatar.svg";

import "./UserInfoCard.css";

function UserInfoCard({ author, user }) {
  return (
    <div className="userInfoBox">
      <div className="userInfoWrapper">
        <div className="userInfo">
          <h1 className="pageTitle">{author.name}</h1>
          <div className="">
            <p className="mainFont">
              {author.description ? author.description : "I'm a food lover."}
            </p>

            {user && author._id === user._id && (
              <p className="mainFont">Email: {author.email}</p>
            )}
            <p></p>
            <p
              className="mainFont semiBoldWeigth"
              style={{ marginTop: "auto" }}
            >
              {author.recipes?.length} recipes
            </p>
          </div>
        </div>
      </div>
      <div className="avatarImageWrapper">
        <img
          src={author.image || defaultAvatar}
          alt={`${author.name}'s profile`}
          className="userAvatarImage"
        />
      </div>
    </div>
  );
}

export default UserInfoCard;
