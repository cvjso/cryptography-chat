import axios from "axios";

const BACKEND_ADDRESS = "localhost:8000/";

export const ROUTES = {
  login: "login/",
  logout: "logout/",
};

export function doGet(route) {
  return axios.get(BACKEND_ADDRESS + route);
}
