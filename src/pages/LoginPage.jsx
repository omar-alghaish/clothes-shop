import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import img from "../imges/i3.jpg";
function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("wrong email or password");
        // Perform the desired action for an existing email
      } else {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="main-container">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="inputs-container">
          <h2>LOGIN</h2>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" name="" id="" ref={emailRef} placeholder="Email"/>
            <input type="password" ref={passwordRef} placeholder="Password"/>
            <input
              className="submit"
              type="submit"
              value="login"
              disabled={loading}
            />
          </form>
          <div className="bottom-div">
            <div>
            do not have account <Link to="/signup">signup</Link>
          </div>

          <Link to="/forget-password">forget password</Link>
          </div>
          
          {error && <h2>{error}</h2>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
