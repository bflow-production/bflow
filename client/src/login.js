import React, { useState } from "react";
import './login.css'; 
import authService from "./services/authService";
import { jwtDecode } from "jwt-decode";


const Login = ({setAuthView, setUserData, setActiveView, showNotification}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await authService.login({ email, password });
      console.log(response);
      
      if (response.message === "Login successful") {
        const { token, user_id, user_name, role } = response; 
        localStorage.setItem("jwtToken", token); 
        
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        setUserData({
          userId: user_id, 
          username: user_name, 
          role: role,
        });

        setActiveView("home");
      }

    } catch (error) {
      console.error("Login error:", error);
      showNotification("Virhe kirjautumisessa", true);
    }
  };


  return (
    <>
    <header className="header">
      <h1 className="headerTitle">Tervetuloa B'FLOW:hun</h1>
    </header>
    <div className="login">
      <h1>Kirjaudu sisään</h1>
      <form onSubmit={handleLogin}>
        <label>Sähköposti:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Salasana:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Kirjaudu sisään</button>
      </form>
      <p className="notRegistered">
      Eikö sinulla ole tiliä?{" "}
        <button onClick={() => setAuthView("register")}>Rekisteröidy</button>
      </p>
    </div>
  </>
    
  );
}

export default Login;
