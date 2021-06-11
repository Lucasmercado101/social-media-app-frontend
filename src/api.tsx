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

interface Post {
  authorId: number;
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  likes: { id: number }[];
  dislikes: { id: number }[];
}

interface createPostParams {
  content: string;
}

export function createPost(data: createPostParams) {
  return axios.post<Post>("/user/posts", data).then((resp) => resp.data);
}

export function getPosts() {
  return axios.get<Post[]>("/user/posts").then((resp) => resp.data);
}

export function getFeed() {
  return axios.get<Post[]>("/user/feed").then((resp) => resp.data);
}

interface PostWithAuthorData extends Post {
  User: {
    firstName: string;
    lastName: string;
    profilePictureURL?: string;
  };
}

interface paginatedResponse<T> {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  results: T[];
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
    .get<paginatedResponse<PostWithAuthorData>>(
      `/user/explore?${searchParams.toString()}`
    )
    .then((resp) => resp.data);
}

export interface userData {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  profilePictureURL?: string;
}

export function getMyUserData() {
  return axios.get<userData>("/user").then((resp) => resp.data);
}

interface updateMyUserDataProps {
  firstName: string;
  lastName: string;
  profilePictureURL: string | null;
}

export function updateMyUserData(data: updateMyUserDataProps) {
  return axios.put("/user", data);
}

interface uploadImageToCloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  access_mode: string;
  existing: false;
  original_filename: string;
}

export function uploadImageToCloudinary(
  file: any
): Promise<uploadImageToCloudinaryResponse> {
  const formData = new FormData();
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET!);
  formData.append("file", file);

  return fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  ).then((resp) => resp.json());
}

export function logOut() {
  return axios.get("/auth/logout");
}

export function getPublicUserData(userId: number) {
  return axios.get<userData>(`/users/${userId}`).then((resp) => resp.data);
}
interface getPublicUserPostsPaginatedProps {
  limit: number;
  page: number;
  userId: number;
}
export function getPublicUserPostsPaginated({
  limit,
  page,
  userId
}: getPublicUserPostsPaginatedProps) {
  const searchParams = new URLSearchParams({
    limit: limit + "",
    page: page + ""
  });
  return axios
    .get<paginatedResponse<PostWithAuthorData>>(
      `/users/${userId}/posts?${searchParams.toString()}`
    )
    .then((resp) => resp.data);
}

export function likePost(postId: number) {
  return axios.post(`/user/like/post/${postId}`);
}

export function unLikePost(postId: number) {
  return axios.delete(`/user/like/post/${postId}`);
}

export function dislikePost(postId: number) {
  return axios.post(`/user/dislike/post/${postId}`);
}

export function unDislikePost(postId: number) {
  return axios.delete(`/user/dislike/post/${postId}`);
}
