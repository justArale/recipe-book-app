import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import {
  uploadAvatarImage,
  deleteAvatarImage,
} from "../service/api/image.service";
import {
  getSingleUser,
  updateUser,
  changeUserPassword,
} from "../service/api/user.service";
import "../components/UserEditPage.css";
import { Image } from "@just1arale/icons";
import { Edit } from "@just1arale/icons";
import { Delete } from "@just1arale/icons";
import { Check } from "@just1arale/icons";
import { Cancel } from "@just1arale/icons";
import { extractPublicId } from "cloudinary-build-url";

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
  const { user } = useContext(AuthContext);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [oldImageId, setOldImageId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getSingleUser(authorId).then((userData) => {
        const { name, image, email, description } = userData;
        setFormValues({
          name: name || "",
          image: image || "",
          email: email || "",
          description: description || "",
          oldPassword: "",
          newPassword: "",
        });
      });
    }
  }, [user, authorId]);

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

      const file = event.target.files[0];
      const fileData = new FormData();
      fileData.append("file", file);

      const fileUrl = await uploadAvatarImage(fileData);
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
    const oldPath = extractPublicId(imageURL);
    const segments = oldPath.split("/");
    return segments[segments.length - 1];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formValues.oldPassword && formValues.newPassword) {
        await changeUserPassword(
          user._id,
          formValues.oldPassword,
          formValues.newPassword
        );
        setFormValues((prevValues) => ({
          ...prevValues,
          oldPassword: "",
          newPassword: "",
        }));
        await fetchUserData();
        navigate(`/user/${authorId}`);
      } else {
        if (oldImageId) {
          deleteAvatarImage(oldImageId);
        }
        await updateUser(user._id, formValues);
        navigate(`/user/${authorId}`);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
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
                    <Delete width="16" height="16" alt=" Delete Icon" />

                    <span className="buttonFont">Remove</span>
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
                    <Edit width="16" height="16" alt="Edit Icon" />

                    <span className="buttonFont">Change</span>
                  </div>
                ) : (
                  <div className="buttonContentWrapper">
                    <Image width="16" height="16" alt="Image Icon" />

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
                <Cancel width="16" height="16" alt="Cancel Icon" />

                <span className="buttonFont">Cancel</span>
              </div>
            </button>
          </Link>
          <button type="submit" className=" buttonReverse">
            <div className="buttonContentWrapper">
              <Check width="16" height="16" alt="Check Icon" />

              <span className="buttonFont buttonFontReverse">Save</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditPage;
