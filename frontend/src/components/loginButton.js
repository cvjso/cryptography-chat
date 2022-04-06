import React from "react";
import { userStore } from "../store";
import { doGet, ROUTES } from "../utils/requests";

export default function LoginButton() {
  const isLogged = userStore((state) => state.isLogged);
  const makeLogin = () => {
    doGet(ROUTES.login).then();
  };

  const makeLogout = () => {
    doGet(ROUTES.logout).then();
  };

  if (isLogged) return <button>logout</button>;
  else return <button>login</button>;
}
