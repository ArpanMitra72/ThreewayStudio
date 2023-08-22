import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("Response from server:", response.data);
      const userRole = response.data.role;
      console.log("User role:", userRole);
      if (userRole === "manufacturer") {
        navigate("/createOrder");
      } else if (userRole === "transporter") {
        navigate("/transporterDashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="fillpage">
      <div className="loginStyle">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="formStyle">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
