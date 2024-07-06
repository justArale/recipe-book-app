import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import fileUploadService from "../service/file-upload.service";
import "../components/UserEditPage.css";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_USER_FORM_VALUES = {
  name: "",
  image: "",
  description: "",
  oldPassword: "",
  newPassword: "",
};

function UserEditPage() {
  const { authorId } = useParams();

  const [formValues, setFormValues] = useState(DEFAULT_USER_FORM_VALUES);
  const { user, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]); // Trigger fetchUserData whenever user changes

  const fetchUserData = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/api/user/${authorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const { name, image, description } = response.data;
      setFormValues({
        name: name || "",
        image: image || "",
        description: description || "",
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      const errorDescription =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (event) => {
    try {
      setImageIsLoading(true);
      const file = event.target.files[0];
      const fileData = new FormData();
      fileData.append("file", file);

      const fileUrl = await fileUploadService.uploadAvatar(fileData);
      setFormValues((prevValues) => ({
        ...prevValues,
        image: fileUrl,
      }));
      setImageIsLoading(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setImageIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    try {
      if (formValues.oldPassword && formValues.newPassword) {
        await axios.put(
          `${API_URL}/api/user/${user._id}/change-password`,
          {
            oldPassword: formValues.oldPassword,
            newPassword: formValues.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setFormValues((prevValues) => ({
          ...prevValues,
          oldPassword: "",
          newPassword: "",
        }));
        await authenticateUser();
        await fetchUserData();
        navigate(`/user/${authorId}`);
      } else {
        await axios.put(`${API_URL}/api/user/${user._id}`, formValues, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        navigate(`/user/${authorId}`);
      }
    } catch (error) {
      const errorDescription =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="addRecipe-page">
      <form className="addRecipe" onSubmit={handleSubmit}>
        <div className="addRecipe-main">
          <h4 className="bodyLarge addRecipe-header">Edit your profile</h4>

          <div className="addRecipe-headerRow">
            <div className="addRecipe-headerContent">
              <input
                required
                type="text"
                name="name"
                className="body title"
                placeholder="Name..."
                value={formValues.name}
                onChange={handleInputChange}
              />

              <textarea
                required
                type="text"
                name="description"
                className="body description"
                placeholder="Description..."
                value={formValues.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="uploadButtonWrapper">
              {formValues.image && (
                <img
                  src={formValues.image}
                  alt={`Uploaded Avatar`}
                  className="image-preview"
                />
              )}
              <label className="uploadButton">
                <input
                  type="file"
                  name="img"
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webm, image/webp, image/heic"
                  onChange={handleAvatarChange}
                />
                {imageIsLoading
                  ? "🔄 Loading..."
                  : formValues.image
                  ? "🖼️ Change Image"
                  : "🖼️ Choose Image"}
              </label>
            </div>
          </div>
        </div>

        <div className="addRecipe-ingredient">
          <label className="bodyLarge">Change password</label>
          <div className="passwordBox">
            <label htmlFor="oldPassword" className="body">
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleInputChange}
              className="body title"
              placeholder="*****"
            />
          </div>
          <div className="passwordBox">
            <label htmlFor="newPassword" className="body">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleInputChange}
              className="body title"
              placeholder="*****"
            />
          </div>
        </div>

        <div className="action">
          <Link to={`/user/${authorId}`}>
            <button
              type="button"
              className="body noUnderline primaryColor boldWeight"
            >
              ❌ Cancel
            </button>
          </Link>
          <button type="submit" className="body primaryColor boldWeight">
            ✅ Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditPage;
