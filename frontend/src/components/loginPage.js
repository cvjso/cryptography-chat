import LoginButton from "./loginButton";
import { useState } from "react";
import { Card, Input, Typography, Divider } from "@mui/material";
import "./login.css";
import imageIcon from "../imgs/logo.png";
import InfoIcon from "@mui/icons-material/Info";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Test Users</Typography>
        </AccordionSummary>
        <Divider />

        <AccordionDetails>
          <Typography sx={{ marginBottom: "10px" }}>
            username: carlos <br />
            password: 123
          </Typography>
          <Divider />
          <Typography sx={{ marginTop: "10px" }}>
            username: david <br />
            password: 321
          </Typography>
        </AccordionDetails>
      </Accordion>
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
