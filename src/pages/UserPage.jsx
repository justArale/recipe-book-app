import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";
import axios from "axios";
import DashboardPage from "./DashboardPage";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import "../components/UserPage.css";
import { getSingleUser, deleteUser } from "../service/api/user.service";
// import editIcon from "../assets/edit.svg";
// import deleteIcon from "../assets/delete.svg";
import { Edit } from "@just1arale/icons";
import { Delete } from "@just1arale/icons";

// const API_URL = import.meta.env.VITE_API_URL;

function UserPage() {
  const { user, logOutUser } = useContext(AuthContext);
  const { authorId } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState({});
  // const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  // const fetchAuthorData = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/user/${authorId}`);
  //     setCurrentAuthor(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching author data:", error);
  //     const errorDescription =
  //       error.response?.data?.message ||
  //       "An error occurred while fetching author data";
  //     setErrorMessage(errorDescription);
  //     setIsLoading(false);
  //   }
  // };

  // const deleteUser = async () => {
  //   try {
  //     const storedToken = localStorage.getItem("authToken");
  //     const response = await axios.delete(`${API_URL}/api/user/${authorId}`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     });
  //     logOutUser();
  //     navigate(`/`);
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     setErrorMessage("An error occurred while deleting the user.");
  //   }
  // };

  useEffect(() => {
    // window.location.reload();
    window.scrollTo(0, 0);
    getSingleUser(authorId).then((userData) => {
      setCurrentAuthor(userData);
      setIsLoading(false);
    });
  }, []);

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then(() => {
      logOutUser();
      navigate(`/`);
    });
  };

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
    <div className="userPageWrapper">
      {currentAuthor && (
        <div className="UserPage">
          <div className="userPageHeaderBox">
            <div className="ownerContent">
              {isLoading ? (
                <div className="skeleton skeletonUserInfoBox"></div>
              ) : (
                <UserInfoCard author={currentAuthor} user={user} />
              )}

              {user && currentAuthor._id === user._id && (
                <div className="action">
                  <Link
                    to={`/user/${authorId}/edit`}
                    className="noUnderline primaryColor"
                  >
                    <button className="buttonFont noUnderline primaryColor">
                      {" "}
                      <div className="buttonContentWrapper">
                        <Edit width="16" height="16" alt="Edit Icon" />

                        <span className="buttonFont">Edit</span>
                      </div>
                    </button>
                  </Link>

                  <button
                    className="buttonFont noUnderline primaryColor"
                    onClick={handleDeleteModel}
                  >
                    <div className="buttonContentWrapper">
                      <Delete width="16" height="16" alt="Delete Icon" />

                      <span className="buttonFont">Delete</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <DashboardPage />
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="overlay-content">
            <div className="deleteModalContent">
              <h3 className="headline">Delete Profil</h3>
              <p className="mainFont">Are you sure to delete your profil?</p>
              <button
                className="button buttonAware primaryColor"
                onClick={() => handleDeleteUser(currentAuthor._id)}
              >
                <div className="buttonContentWrapper">
                  <Delete width="16" height="16" alt="Delete Icon" />

                  <span className="buttonFont">Delete</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
