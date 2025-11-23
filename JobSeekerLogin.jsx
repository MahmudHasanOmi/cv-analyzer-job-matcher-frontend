import React, { useState } from "react";
import "./Login.css";

const JobSeekerLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "jobseeker");
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-container">
      <h2>Job Seeker Login</h2>
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
        <button type="submit">Login as Job Seeker</button>
      </form>
    </div>
  );
};

export default JobSeekerLogin;
