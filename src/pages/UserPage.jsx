import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";
import axios from "axios";
import DashboardPage from "./DashboardPage";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UserPage() {
  const { user, logOutUser } = useContext(AuthContext);
  const { authorId } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const deleteUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.delete(`${API_URL}/api/user/${authorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log("Deleted:", response.data);
      // notifyDelete();
      logOutUser();
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("An error occurred while deleting the user.");
    }
  };

  useEffect(() => {
    // window.location.reload();
    window.scrollTo(0, 0);
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
            <UserInfoCard author={currentAuthor} user={user} />
            {user && currentAuthor._id === user._id && (
              <div className="action">
                <Link
                  to={`/user/${authorId}/edit`}
                  className="noUnderline primaryColor boldWeight"
                >
                  <button className="body">✏️ Edit</button>
                </Link>

                <button
                  className="body noUnderline primaryColor boldWeight"
                  onClick={handleDeleteModel}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
          <DashboardPage />
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="overlay-content">
            <div className="deleteModalContent">
              <h3 className="bodyLarge">Delete Profil</h3>
              <p className="body">Are you sure to delete your profil?</p>
              <button
                className="button buttonAware primaryColor boldWeight"
                onClick={() => deleteUser(currentAuthor._id)}
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
