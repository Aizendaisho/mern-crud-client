import React from "react";
import { useApicall, deleteOnePostAxios } from "../hooks/useApiCall";
import { Posts } from "../types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const deletePost = () => {
    return useMutation(deleteOnePostAxios, {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  };

  const { mutate: deletingPost } = deletePost();

  const { data } = useApicall();

  const handlerDelete = (id: string, title: string) => {
    toast((t) => (
      <div className="grid gap-2">
        <p className="text-center text-xl">
          Do you want to delete <span className=" font-bold">{title} </span>?
        </p>
        <div className="buton flex gap-2 items-center justify-center">
          <button
            onClick={() => {
              deletingPost(id);
              toast.dismiss(t.id);
            }}
            className="btn btn-error"
          >
            delete
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="btn">
            cancel
          </button>
        </div>
      </div>
    ));
  };
  return (
    <div className="container">
      <Link to="/addpost">Nuevo Post</Link>
      <div className="grid grid-cols-4">
        {data?.map((post: Posts) => (
          <div key={post._id} className="targeta">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.description}</p>
              </div>
              <Link to={`/single/${post._id}`}>
                <figure>
                  <img src={post?.image?.url} alt={post.title} />
                </figure>
              </Link>
              <button
                onClick={() => handlerDelete(post._id, post.title)}
                className="btn btn-warning"
              >
                borrar
              </button>
              <Link className=" btn btn-primary" to={`/${post._id}`}>
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
