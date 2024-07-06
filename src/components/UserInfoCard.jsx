import React from "react";
import defaultImage from "../assets/touch-icon.png";
import "./UserInfoCard.css";

function UserInfoCard({ author }) {
  return (
    <div className="userInfoBox">
      <div className="userInfo">
        <h1 className="pageTitle">{author.name}</h1>
        <div className="">
          <p className="body">
            Description:{" "}
            {author.description ? author.description : "I'm a food lover."}
          </p>
          {/* <p className="body">Email: {author.email}</p> */}
        </div>
      </div>

      <img
        src={author.image || defaultImage}
        alt={`${author.name}'s profile`}
        className="userImageCard"
      />
    </div>
  );
}

export default UserInfoCard;
