import axios from "axios";

export const axiosPost = axios.create({
  baseURL: "http://localhost:4000",
});

