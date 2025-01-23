import React, { useState } from "react";
import axios from "axios";
import './login.css'; 

function Login({ setUserId ,setAuthView}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        email: email,
        password: password,
      });
      setUserId(response.data.user_id); 
    } catch (err) {
      setError("Invalid email or password");
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
      <form onSubmit={handleSubmit}>
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
