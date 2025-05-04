import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Form.css";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/user/login", credentials);
      toast.success("Login successful!");
      setCredentials({ email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don’t have an account? <Link to="/signup">Register</Link>
      </p>
    </form>
  );
}

export default Login;
