import LoginButton from "./loginButton";
import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-container">
      <h2>Faça login</h2>
      <h4>username</h4>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <h4>password</h4>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <LoginButton username={username} password={password} />
    </div>
  );
}
