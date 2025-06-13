import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", isHost: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
        <label>
          <input type="checkbox" name="isHost" checked={formData.isHost} onChange={handleChange} /> Register as Host
        </label><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
