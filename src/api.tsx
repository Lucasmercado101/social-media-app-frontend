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
