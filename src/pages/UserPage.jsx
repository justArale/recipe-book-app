import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import defaultImage from "../assets/touch-icon.png";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function UserPage() {
  const { authorId } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/${authorId}`);
      setCurrentAuthor(response.data);
      console.log("Author: ", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching author data:", error);
      const errorDescription =
        error.response?.data?.message ||
        "An error occurred while fetching author data";
      setErrorMessage(errorDescription);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorData();
  }, []);

  const handleDeleteModel = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      {currentAuthor && (
        <div className="userDetail">
          <div className="userCard">
            <img
              src={currentAuthor.image || defaultImage}
              alt={`${currentAuthor.name}'s profile`}
              className="userImageCard"
            />
            <div>
              <h1 className="bodyLarge">{currentAuthor.name}</h1>
              <p className="body">{currentAuthor.description}</p>
            </div>
          </div>

          <div>
            <p className="body">Email: {currentAuthor.email}</p>
          </div>

          <div className="action">
            <Link to={"/profile/edit"} className="noUnderline primaryColor">
              <button className="button">✏️ Edit</button>
            </Link>

            <button
              className="button awareButtonSmall buttonFont buttonFontReverse"
              onClick={handleDeleteModel}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="overlay-content">
            <img
              src={closeIcon}
              alt="close Icon"
              className="closeIcon"
              onClick={closeModal}
            />

            <div className="deleteModalContent">
              <h3 className="bodyLarge">Delete Profil</h3>
              <p className="body">Are you sure to delete your profil?</p>
              <button
                className="button buttonAware primaryColor boldWeight"
                onClick={() => deleteProfil(currentAuthor._id)}
              >
                Delete now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
