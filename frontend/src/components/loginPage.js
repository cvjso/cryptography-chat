import LoginButton from "./loginButton";
import { useState } from "react";
import { Card, Input } from "@mui/material";
import "./login.css";
import imageIcon from "../imgs/logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className="login-container">
      <div className="login-header">
        <img id="logo" src={imageIcon} />
        <header>exchat</header>
      </div>
      <div className="login-content">
        <p>Username</p>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <p>Password</p>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <LoginButton username={username} password={password} />
    </Card>
  );
}
