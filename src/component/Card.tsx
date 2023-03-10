import React from 'react'
import { PostCard } from '../types'
import { Link } from 'react-router-dom'

export default function Card({post }:{post: PostCard}) {
  return (
    <div key={post._id} className="targeta">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <Link to={`/single/${post._id}`}>
        <figure>
          <img
            className="  object-cover w-full object-top h-96"
            src={post?.image?.url}
            alt={post.title}
          />
        </figure>
      </Link>
      <button
        onClick={() => post.handlerDelete(post._id, post.title)}
        className="btn btn-warning"
      >
        borrar
      </button>
      <Link className=" btn btn-primary" to={`/${post._id}`}>
        Editar
      </Link>
    </div>
  </div>
  )
}
