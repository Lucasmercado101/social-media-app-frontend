import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

interface registerParams {
  username: string;
  password: string;
}
export function register(data: registerParams) {
  return axios.post("/auth/register", data);
}

interface loginParams {
  username: string;
  password: string;
}
export function logIn(data: loginParams) {
  return axios.post("/auth/login", data);
}

export function isLoggedIn() {
  return axios.get("/auth/is-logged-in");
}
