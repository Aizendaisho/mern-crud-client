import axios from "axios";

export const axiosPost = axios.create({
  baseURL: "https://mern-crud-imagen-server-production.up.railway.app",
});

