import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";
import axios from "axios";
import DashboardPage from "./DashboardPage";

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
    // window.location.reload();
    fetchAuthorData();
  }, []);

  const handleDeleteModel = () => {
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  //   useEffect(() => {
  //     window.location.reload();
  //   }, [authorId]);

  return (
    <div>
      {currentAuthor && (
        <div>
          <div className="">
            <UserInfoCard author={currentAuthor} />
            <div className="action">
              <Link to={"/profile/edit"} className="noUnderline primaryColor">
                <button className="button">✏️ Edit</button>
              </Link>

              <button className="" onClick={handleDeleteModel}>
                🗑️ Delete
              </button>
            </div>
          </div>
          <DashboardPage />
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
