import React, { useState } from "react";
import authService from "./services/authService";
import "./register.css";

function Register({ setAuthView, showNotification }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    birthYear: "",
    country: "",
    role: "", // Default role
  });

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
      showNotification("Valitse rooli ennen jatkamista.", true);
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
      showNotification("Rekisteröinti onnistui!", false);
      setTimeout(() => {
        setAuthView("login"); // Navigate to login page after 3 seconds
      }, 1000);
    } catch (err) {
      showNotification("Rekisteröinti epäonnistui. Yritä uudelleen.", true);
    }
  };

  return (
    <>
      <header className="header">
        <h1 className="headerTitle">Tervetuloa B'FLOW:hun</h1>
      </header>
      <div className="register">
        <h1>Rekisteröidy</h1>
        <form onSubmit={handleSubmit}>
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
          <label>Valitse rooli:</label>
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
          <button type="submit">Rekisteröidy</button>
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
