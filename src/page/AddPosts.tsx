import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { postStore } from "../store/useStore";
import { createPost, getOnePostAxios } from "../hooks/useApiCall";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { axiosPost } from "../reequest";
import { Posts } from "../types";

export default function AddPosts() {
  const { post, setPost } = postStore();
  const { id } = useParams();
  const myId = id ?? "defaultId";
  const [postDefault, setPostDefault] = useState({
    title: "",
    description: "",
    image: null,
  });

  const comprobar = async () => {
    if (id) {
      const datos = await getOnePostAxios(myId);
      await setPostDefault(datos.data);
    }
  };

  useEffect(() => {
    comprobar();
  }, [id]);

  const navegate = useNavigate();
  const queryClient = useQueryClient();
  const updatePost = (post: Posts) => axiosPost.put(`/posts/${id}`, post);

  const updatePostHook = () => {
    return useMutation(updatePost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  };
  const { mutate: updatingPost } = updatePostHook();

  const addPost = () => {
    return useMutation(createPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  };
  const { mutate: addingPost, isLoading } = addPost();
  return (
    <div className="container mx-auto">
      <Link to="/" className="btn"> Home</Link>
      {id ? <h1 className=" text-3xl">Actualizando post</h1> : <h1 className=" text-3xl">Nuevo post</h1>}
      <Formik
        validationSchema={Yup.object({
          title: Yup.string().required("title is required"),
          description: Yup.string().required("description is required"),
        })}
        onSubmit={(values: any, actions: any) => {
          const { title, description, image } = values;
          if (!id) {
            addingPost(values);
            navegate("/");
          }
          updatingPost(values);
          navegate("/");
        }}
        initialValues={postDefault}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            className=" flex flex-col items-center justify-center gap-10"
            onSubmit={handleSubmit}
          >
            <Field
              className="input "
              component="input"
              name="title"
              placeholder="title"
            />

            <ErrorMessage
              component={"p"}
              className=" text-red-400"
              name="title"
            />

            <Field
              component="textarea"
              className="textarea resize-none"
              name="description"
              placeholder="description"
            />
            <ErrorMessage
              name="description"
              component={"p"}
              className=" text-red-400"
            />
            <label htmlFor="imagen">Subir imagen</label>
            <input
              onChange={(e: any) => setFieldValue("image", e.target.files[0])}
              name="imagen"
              id="imagen"
              type="file"
              className="file-input"
            />
            <button disabled={isLoading} type="submit" className="btn">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
}
