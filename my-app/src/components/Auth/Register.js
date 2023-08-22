import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manufacturer");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        role,
      });
      navigate("/login");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="fillpage">
      <div className="registerStyle">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="formStyle">
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
          <div>
            <label>
              Role:{" "}
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="manufacturer">Manufacturer</option>
                <option value="transporter">Transporter</option>
              </select>
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
