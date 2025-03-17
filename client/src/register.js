import React, { useState } from "react";
import authService from "./services/authService";
import "./register.css";

function Register({ setAuthView }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    birthYear: "",
    country: "",
    role: "", // Default role
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

    if (!formData.role) {
      setError("Valitse rooli ennen jatkamista.");
      return;
    }
    if (!formData.email) {
      setError("Sähköpostiosoite on pakollinen.");
      return;
    }
    if (!formData.password) {
      setError("Salasana on pakollinen.");
      return;
    }
    if (!formData.name) {
      setError("Nimi on pakollinen.");
      return;
    }
    if (!formData.birthYear) {
      setError("Syntymävuosi on pakollinen.");
      return;
    }
    
    try {
      await authService.register({
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
      }, 1000);
    } catch (err) {
      setError(
        `Registration failed. Please try again. ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  return (
    <>
      <header className="header">
        <h1 className="headerTitle">Welcome to B'FLOW</h1>
      </header>
      <div className="register">
        <h1>Registeröidy</h1>

        {error && <p className="error">{error}</p>}
        {success && (
          <p className="success">
            Registration successful! Redirecting to login...
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <label>Rooli:</label>
          <div className="role-buttons">
            <button
              type="button"
              className={formData.role === "player" ? "active" : ""}
              onClick={() => handleRoleChange("player")}
            >
              Pelaaja
            </button>
            <button
              type="button"
              className={formData.role === "parent" ? "active" : ""}
              onClick={() => handleRoleChange("parent")}
            >
              Vanhempi
            </button>
            <button
              type="button"
              className={formData.role === "coach" ? "active" : ""}
              onClick={() => handleRoleChange("coach")}
            >
              Valmentaja
            </button>
          </div>
          <label>Käyttäjänimi:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Sähköposti:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Salasana:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Nimi:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Syntymävuosi:</label>
          <input
            type="number"
            name="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            required
          />
          <label>Maa:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <button type="submit">Registeröidy</button>
        </form>

        <p className="notRegistered">
           Onko sinulla jo tili?{" "}
          <button onClick={() => setAuthView("login")}>Kirjaudu sisään</button>
        </p>
      </div>
    </>
  );
}

export default Register;
