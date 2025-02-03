import React, { useState } from "react";
import axios from "axios";
import './register.css'; // Ensure the correct CSS file is imported

function Register({ setAuthView }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    birthYear: "",
    country: "",
    role: "" // Default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State to handle success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role: role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        birthYear: parseInt(formData.birthYear),
        country: formData.country,
        role: formData.role,
      });
      setSuccess(true); // Show success message
      setTimeout(() => {
        setAuthView("login"); // Navigate to login page after 3 seconds
      }, 3000);
    } catch (err) {
      setError(`Registration failed. Please try again. ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      <header className="header">
        <h1 className="headerTitle">Welcome to B'FLOW</h1>
      </header>
      <div className="register">
        <h1>Register</h1>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">Registration successful! Redirecting to login...</p>}
        <form onSubmit={handleSubmit}>
          <label>Role:</label>
          <div className="role-buttons">
            <button
              type="button"
              className={formData.role === 'player' ? 'active' : ''}
              onClick={() => handleRoleChange('player')}
            >
              Player
            </button>
            <button
              type="button"
              className={formData.role === 'parent' ? 'active' : ''}
              onClick={() => handleRoleChange('parent')}
            >
              Parent
            </button>
            <button
              type="button"
              className={formData.role === 'coach' ? 'active' : ''}
              onClick={() => handleRoleChange('coach')}
            >
              Coach
            </button>
          </div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Birth Year:</label>
          <input
            type="number"
            name="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            required
          />
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p className="notRegistered">
          Already have an account?{" "}
          <button onClick={() => setAuthView("login")}>Login</button>
        </p>
      </div>
    </>
  );
}

export default Register;