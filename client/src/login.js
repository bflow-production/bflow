import React, { useState } from "react";
import './login.css'; 
import authService from "./services/authService";


const Login = ({setAuthView, setUserData, setActiveView}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await authService.login({ email, password });
      console.log(response);
      
      if (response.message === "Login successful") {
        const { token, user_id, user_name, role } = response; 
        localStorage.setItem("jwtToken", token); 
        setActiveView("home");

        setUserData({
          userId: user_id, 
          username: user_name, 
          role: role,
        });
      }

    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials");
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
