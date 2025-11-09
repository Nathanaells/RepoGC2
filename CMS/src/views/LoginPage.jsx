import { useState } from "react";
import "../css/LoginPage.css";
import axios from "axios";
import url from "../constant/url";
import { showSuccess, showError } from "../components/toastUI.js";
import { Navigate, useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await axios.post(`${url}/login`, { email, password });
      localStorage.setItem("access_token", data.data.access_token);
      navigate("/home");
      showSuccess();
    } catch (error) {
      showError(error.response.data.message);
    }
  }

  if (localStorage.access_token) {
    showError("You Already logged in");
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">UNIQLO LOGIN</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-footer">
            By logging in, you agree to our Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
