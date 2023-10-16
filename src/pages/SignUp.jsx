import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import img from "../imges/i2.jpg";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [imge, setImge] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();

  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");

  const addUser = async () => {
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const phone = phoneRef.current.value;

    const email = emailRef.current.value;
    await addDoc(usersCollectionRef, {
      name,
      phone,
      age,
      email,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/profile");
      addUser();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use");
        // Perform the desired action for an existing email
      } else {
        // setError("Failed to create an account");
        setError(error.message);
      }
    }

    setLoading(false);
  };
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`signup-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="main-container">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="inputs-container">
          <h2>SIGN IN</h2>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" ref={nameRef} />
            <input type="text" placeholder="Phone number" ref={phoneRef} />

            <input type="number" name="" id="" placeholder="Age" ref={ageRef} />
            <input
              type="email"
              name=""
              id=""
              ref={emailRef}
              placeholder="Email"
            />
            <input
              type="password"
              name=""
              id=""
              ref={passwordRef}
              placeholder="password"
            />
            <input
              type="password"
              name=""
              id=""
              ref={passwordConfirmationRef}
              placeholder="password confirm"
            />
           
            <input
              className="submit"
              type="submit"
              value="signup"
              disabled={loading}
            />
          </form>
          <div>
            {" "}
            Have an account? <Link to="/login">log in</Link>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
