import React, { useState } from "react";
import axios from "axios";
import './login.css'; 

function Login({setAuthView, setUserData, setActiveView}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = "http://127.0.0.1:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
    
      const response = await axios.post(`${backendURL}/api/login`, {
        email,
        password,
      });
  
      if (response.data.message === "Login successful") {

        const { token, user_id, user_name, role } = response.data; 
        localStorage.setItem("jwtToken", token); 
        setActiveView("profile");

        setUserData({
          userId: user_id, 
          username: user_name, 
          role: role,
        });

      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    }
  };
  
  
  


  return (
    <>
    <header className="header">
      <h1 className="headerTitle">Welcome to B'FLOW</h1>
    </header>
    <div className="login">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="notRegistered">
        Don't have an account?{" "}
        <button onClick={() => setAuthView("register")}>Register</button>
      </p>
    </div>
  </>
    
  );
}

export default Login;
