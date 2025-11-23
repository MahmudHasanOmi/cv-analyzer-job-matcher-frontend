import React, { useState } from "react";
import "./Login.css";

const HRLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Save role in localStorage
    localStorage.setItem("role", "hr");
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-container">
      <h2>HR Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login as HR</button>
      </form>
    </div>
  );
};

export default HRLogin;
