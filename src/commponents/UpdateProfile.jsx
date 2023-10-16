import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUser } from "../context/UserContext";
import { UploadImage } from "../logic/Upload";
function UpdateProfile() {
  const { updateUser, user } = useUser();

  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();

  const [error, setError] = useState("");
  const [imge, setImge] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const ageRef = useRef();

  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("password do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;
    const newName = nameRef.current.value;
    const newPhone = phoneRef.current.value;
    const newAge = ageRef.current.value;

    if (newEmail !== currentUser.email) {
      promises.push(updateUserEmail(newEmail));
    }
    if (newPassword) {
      promises.push(updateUserPassword(newPassword));
    }
    const imgUrl = await UploadImage({
      imagePath: `users/${imge.name}`,
      image: imge,
    });
    promises.push(
      updateUser(user.id, {
        profileImage: imgUrl,
        email: newEmail,
        name: newName,
        phone: newPhone,
        age: newAge,
      })
    );

    Promise.all(promises)
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        setError("Failed to update account");
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      className={`update-profile-container ${isDarkMode ? "dark" : "light"}`}
    >
      <div className="main-container">
        <div className="inputs-container">
          <h2>UPDATE PROFILE</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="img-container">
              <div className="img-place-holder">
                
                {imge ? <img src={URL.createObjectURL(imge)} alt="" />: "+"}
              </div>
              <input
                type="file"
                name="profile-img"
                id="profile-img"
                onChange={(e) => {
                  setImge(e.target.files[0]);
                }}
              />
            </div>
            <input
              type="text"
              name=""
              id=""
              ref={nameRef}
              defaultValue={user?.name}
            />
            <input
              type="email"
              name=""
              id=""
              ref={emailRef}
              defaultValue={currentUser?.email}
              required
            />
            <input
              type="text"
              name=""
              id=""
              ref={phoneRef}
              defaultValue={user?.phone}
            />
            <input
              type="text"
              name=""
              id=""
              ref={ageRef}
              defaultValue={user?.age}
            />

            <input
              type="password"
              name=""
              id=""
              ref={passwordRef}
              placeholder="old password"
            />
            <input
              type="password"
              name=""
              id=""
              ref={passwordConfirmationRef}
              placeholder="New password"
            />
            <input
              className="submit"
              type="submit"
              value="update"
              disabled={loading}
              placeholder="Confirm new password"
            />
          </form>
          <Link to="/profile">Cancel</Link>
          {error && <h2>{error}</h2>}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
