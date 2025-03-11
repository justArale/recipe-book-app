import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard";
import DashboardPage from "./DashboardPage";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import "../components/UserPage.css";
import { getSingleUser, deleteUser } from "../service/api/user.service";
import { Edit } from "@just1arale/icons";
import { Delete } from "@just1arale/icons";

function UserPage() {
  const { user, logOutUser } = useContext(AuthContext);
  const { authorId } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
