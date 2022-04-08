import React from "react";
import { userStore } from "../store";
import { doPost, ROUTES } from "../utils/requests";
import { decryptRSA, publicKey } from "../utils/RSAAlgoritm";

export default function LoginButton(props) {
  const isLogged = userStore((state) => state.isLogged);
  const login = userStore((state) => state.login);
  const logout = userStore((state) => state.logout);
  const setCommunicationKey = userStore((state) => state.setCommunicationKey);
  const setUsername = userStore((state) => state.setUsername);

  const makeLogin = () => {
    doPost(ROUTES.login, {
      username: props.username,
      password: props.password,
      "session key": new Date().getTime(),
      "public key": publicKey,
    })
      .then((response) => {
        console.log(response);
        console.log(decryptRSA(response.data));
        setCommunicationKey(decryptRSA(response.data));
        login();
        setUsername(props.username);
      })
      .catch((error) => console.log(error));
  };

  const makeLogout = () => {
    doPost(ROUTES.logout, { username: props.username }).then((response) => {
      if (response.status === "200") {
        logout();
      }
    });
  };

  if (isLogged) return <button onClick={makeLogout}>logout</button>;
  else return <button onClick={makeLogin}>login</button>;
}
