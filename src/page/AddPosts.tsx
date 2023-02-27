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
    <div>
      <Link to="/">A Home</Link>
      {id ? <h1>Actualizando post</h1> : <h1>Nuevo post</h1>}
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
          <Form onSubmit={handleSubmit}>
            <Field className="input" name="title" placeholder="title" />

            <ErrorMessage name="title" />

            <Field
              className="input"
              name="description"
              placeholder="description"
            />
            <ErrorMessage name="description" />
            <label htmlFor="imagen">Subir imagen</label>
            <input
              onChange={(e: any) => setFieldValue("image", e.target.files[0])}
              name="imagen"
              id="imagen"
              type="file"
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
