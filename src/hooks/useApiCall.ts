import { axiosPost } from "../reequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Posts } from "../types";

const getPosts = () => {
  return axiosPost.get("/posts");
};

export const createPost = (post: any) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return axiosPost.post("/posts", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useApicall = () => {
  return useQuery(["posts"], getPosts, {
    select: (data) => {
      return data.data;
    },
  });
};

export const getOnePostAxios = async (id: string) => {
  return await axiosPost.get(`/posts/${id}`);
};
export const getOnePost = (id: string) => {
  return useQuery(["post", id], () => getOnePostAxios(id), {
    select: (data) => {
      return data.data;
    },
  });
};



export const deleteOnePostAxios = (id: string) => {
  return axiosPost.delete(`/posts/${id}`);
};