import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import fileUploadService from "../service/file-upload.service";
import "../components/UserEditPage.css";
import imageIcon from "../assets/image.svg";
import editIcon from "../assets/editWhite.svg";
import deleteIcon from "../assets/deleteWhite.svg";
import checkIcon from "../assets/checkWhite.svg";
import cancelIcon from "../assets/cancel.svg";
import { extractPublicId } from "cloudinary-build-url";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_USER_FORM_VALUES = {
  name: "",
  image: "",
  email: "",
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
  const [oldImageId, setOldImageId] = useState();
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
      const { name, image, email, description } = response.data;
      setFormValues({
        name: name || "",
        image: image || "",
        email: email || "",
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
      const oldId = getOldImageId(formValues.image);
      setOldImageId(oldId);
      console.log("old image id", oldId);

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

  const handleAvatarDelete = () => {
    const oldId = getOldImageId(formValues.image);
    setOldImageId(oldId);
    formValues.image = "";
  };

  const getOldImageId = (imageURL) => {
    if (!imageURL) {
      return "";
    }
    console.log("formValues.image", imageURL);
    const oldPath = extractPublicId(imageURL);
    console.log("oldPath", oldPath);

    const segments = oldPath.split("/");
    return segments[segments.length - 1];
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
        if (oldImageId) {
          await axios.delete(`${API_URL}/api/delete-avatar/${oldImageId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
        }

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
          <h4 className="headline addRecipe-header">Profile</h4>

          <div className="addRecipe-headerRow">
            <div className="addRecipe-headerContent">
              <input
                required
                type="text"
                name="name"
                className="mainFont inputField"
                placeholder="Name..."
                value={formValues.name}
                onChange={handleInputChange}
              />

              <input
                required
                type="email"
                name="email"
                className="mainFont inputField"
                placeholder="Email..."
                value={formValues.email}
                onChange={handleInputChange}
              />

              <textarea
                required
                type="text"
                name="description"
                className="mainFont description"
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
              {formValues.image && !imageIsLoading && (
                <button
                  className="zindex buttonReverseHalf"
                  onClick={handleAvatarDelete}
                >
                  <div className="buttonContentWrapper">
                    <div className="iconWrapper">
                      <img src={deleteIcon} alt="Icon" />
                    </div>
                    <span className="buttonFont">Remove Image</span>
                  </div>
                </button>
              )}
              <label
                className={`uploadButton ${
                  formValues.image ? "buttonReverseHalf" : ""
                }`}
              >
                <input
                  type="file"
                  name="img"
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webm, image/webp, image/heic"
                  onChange={handleAvatarChange}
                />
                {imageIsLoading ? (
                  "🔄 Loading..."
                ) : formValues.image ? (
                  <div className="buttonContentWrapper">
                    <div className="iconWrapper">
                      <img src={editIcon} alt="Icon" />
                    </div>
                    <span className="buttonFont">Change Image</span>
                  </div>
                ) : (
                  <div className="buttonContentWrapper">
                    <div className="iconWrapper">
                      <img src={imageIcon} alt="Icon" className="iconWrapper" />
                    </div>
                    <span className="buttonFont">Choose Image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="addRecipe-ingredient">
          <label className="headline">Change password</label>
          <div className="passwordBox">
            <label htmlFor="oldPassword" className="mainFont">
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleInputChange}
              className="mainFont inputField"
              placeholder="*****"
            />
          </div>
          <div className="passwordBox">
            <label htmlFor="newPassword" className="mainFont">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleInputChange}
              className="mainFont inputField"
              placeholder="*****"
            />
          </div>
        </div>

        <div className="action">
          <Link to={`/user/${authorId}`}>
            <button type="button" className="noUnderline primaryColor">
              <div className="buttonContentWrapper">
                <div className="iconWrapper">
                  <img src={cancelIcon} alt="Icon" />
                </div>
                <span className="buttonFont">Cancel</span>
              </div>
            </button>
          </Link>
          <button type="submit" className=" buttonReverse">
            <div className="buttonContentWrapper">
              <div className="iconWrapper">
                <img src={checkIcon} alt="Icon" />
              </div>
              <span className="buttonFont buttonFontReverse">Save</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditPage;
