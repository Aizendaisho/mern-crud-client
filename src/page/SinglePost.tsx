import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPost } from "../reequest";
import { deleteOnePostAxios, getOnePost } from "../hooks/useApiCall";

export default function SinglePost() {
  const navegate = useNavigate();
  const { _id } = useParams();
  const myId = _id ?? "defaultId";
  const { data } = getOnePost(myId);
  const deletePost = (id: string) => {
    deleteOnePostAxios(id);
    navegate("/");
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={data?.image?.url}
            alt={data?.title}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{data?.title}</h1>
            <p className="py-6">{data?.description}</p>

            <button onClick={() => deletePost(data._id)}>borrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
