import LoginButton from "./loginButton";
import { useState } from "react";
import { Card, Input, Typography } from "@mui/material";
import "./login.css";
import imageIcon from "../imgs/logo.png";
import InfoIcon from "@mui/icons-material/Info";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="login-container">
      <div className="login-header">
        <img alt="logo" id="logo" src={imageIcon} />
        <header>exchat</header>
      </div>
      <Typography
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <InfoIcon />
        exchat is a mvp of a encrypted chat using the methods of RSA and AES
      </Typography>
      <p>users: carlos | 123 & david | 321</p>
      <div className="login-content">
        <b>Username</b>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <b>Password</b>
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
