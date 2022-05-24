import axios from "axios";

const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND;

export const ROUTES = {
  login: "login/",
  logout: "logout/",
  sendMessage: "send_message/",
};

export function doGet(route) {
  return axios.get(BACKEND_ADDRESS + route);
}

export function doPost(route, body) {
  return axios.post(BACKEND_ADDRESS + route, body);
}
