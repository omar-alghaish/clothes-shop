import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setMessage("check you inbox to get new password");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("wrong email");
        // Perform the desired action for an existing email
      } else {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <div className="main-container">
        <div className="inputs-container">
          <h2 className="title">RESET PASSWORD</h2>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" name="" id="" ref={emailRef} placeholder="Email" />
            <input
              className="submit"
              type="submit"
              value="send code"
              disabled={loading}
            />
          </form>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
