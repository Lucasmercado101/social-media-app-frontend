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

interface Note {
  authorId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

interface createPostParams {
  content: string;
}

export function createPost(data: createPostParams) {
  return axios.post<Note>("/user/posts", data).then((resp) => resp.data);
}

export function getPosts() {
  return axios.get<Note[]>("/user/posts").then((resp) => resp.data);
}

export function getFeed() {
  return axios.get<Note[]>("/user/feed").then((resp) => resp.data);
}

interface paginatedExploreResponse {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  results: Note[];
}

interface getExploreProps {
  limit: number;
  page: number;
}
export function getExplore({ limit, page }: getExploreProps) {
  const searchParams = new URLSearchParams({
    limit: limit + "",
    page: page + ""
  });
  return axios
    .get<paginatedExploreResponse>(`/user/explore?${searchParams.toString()}`)
    .then((resp) => resp.data);
}

export interface myUserData {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export function getMyUserData() {
  return axios.get<myUserData>("/user").then((resp) => resp.data);
}
