import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Helmet } from "react-helmet";
import { useUser } from "../context/UserContext";
import Favourits from "../commponents/Favourits";
import Bag from "../commponents/Bag";

function Profile() {
  const { currentUser, logout } = useAuth();
  // const [user, setUser] = useState();
const {getUser, user,} = useUser();
  useEffect(() => {
    getUser(currentUser.email)
  }, []);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="profile-container">
      <Helmet>
        <title>{user?.name}</title>
        <meta name="description" content={`${user?.name}, ${user?.email}`} />
        <meta name="keywords" content={`${user?.name}, ${user?.email}`} />
      </Helmet>
      <div className="main-container">
        <div className="profile-img">
          <img src={user?.profileImage} alt="" />
        </div>
        <div className="data">
          <div className="about">
            <h1>About</h1>
            <table>
              <tr>
                <th>Name</th>
                <td> {user?.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  {" "}
                  <a href="#">{user?.email}</a>{" "}
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>
                  {" "}
                  <a href="#">{user?.phone}</a>
                </td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{user?.age} </td>
              </tr>
            </table>
          </div>
           <div className="favourits">
            <h1>Favourits</h1>
            <Favourits />
          </div>
          <div className="wish-list">
            <h1>Bag</h1>
            <Bag />
          </div>
          <div className="buttons">
            <Link to="/update-profile">Update profile</Link>

            <button onClick={handleLogout}>log out</button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Profile;
