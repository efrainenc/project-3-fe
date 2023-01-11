import React from 'react'
import { useState, useEffect } from "react"
import { Navigate, useParams, useNavigate, Link } from "react-router-dom"
import { getUserToken } from '../../../utils/authToken'
import Comment from '../../Comment/Comment'
import '../../../css/Show.css'



const Show= ({user})=>
{
  
  const [post, setPost]= useState(null);
  const [editForm, setEditForm] = useState(post);
  // take in the ID parameter from router URL linked from Post.jsx
  const {id} = useParams();
  // useNavigate returns an imperative method that you can use for changing location.
  const navigate = useNavigate();
  // sets post show route URL as variable and dependent ID from useParams
  console.log(id)
  const URL = `https://project-3-be.herokuapp.com/post/${id}`;

  // event handler for when UPDATE name and title are changed
  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }
  // function to fetch show post details for useEffect - and set post detail JSON to setPost and setEditForm State
  const getPost= async()=>
  {
    try
    {
      const response = await fetch(URL);// fetch
      const foundPost = await response.json();
      setPost(foundPost); // set state to post detail result
      setEditForm(foundPost);
    }catch(err)
    {
      console.log(err);
    }
  }
  
  // Update Post function with Authorization header - UPDATE
  const updatePost= async(e)=>
  {
   // prevent default (event object method)
    e.preventDefault()
    try
    { 
      const options = {
        method: "PUT",
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editForm)
        }
      console.log(options)
      const response= await fetch(URL, options);
      console.log(response)
      const updatedPost= await response.json();
      setPost(updatedPost);
      setEditForm(updatedPost);
      navigate(-1);
    }catch(err)
    { 
      console.log(err)
      navigate(URL)
    }
  }

  // Remove Post function with Authorization header - DELETE
  const removePost= async(e)=>
  {
    try
    {
      const options= 
      {
        method: "DELETE",
        headers: {
          'Authorization': `bearer ${getUserToken()}`},
          "Content-Type": "application/json"
      }
      const response= await fetch(URL, options);
      const deletedPost= await response.json();
      navigate(-1);
    }catch(err)
    {
      console.log(err)
      navigate(URL)
    }
  }

  // useEffect to get fire getPost function on page load
  useEffect(()=>{getPost();}, [])

  const signedIn= ()=>{
    return(
      <section>
          <div>
            <button className="delete" onClick={removePost}>
              Remove Post
            </button>
          </div>
        <h2>Edit this Post</h2>
        <form onSubmit={updatePost}>
          <input
              type="text"
              value={editForm.image}
              name="image"
              placeholder="image"
              onChange={handleChange}
          />
          <input
              type="text"
              value={editForm.caption}
              name="caption"
              placeholder="caption"
              onChange={handleChange}
          />
          <input type="submit" value="Update Post" />
        </form> 
      </section>
    )
  }

  // Show Details Loaded function and JSX
  const loaded= ()=>
  {
    return(
      <>
        <div className="postShow">
          <div className="postDiv">
          <Link to={`/${post.owner.username}`}>
            <h2 className="userNamePostLink"> @ {post.owner.username}</h2>
          </Link>
            <img src={post.image}/>
            <h2>{post.caption}</h2>
          </div>
          {/* <>{user.username === post.owner.username ? signedIn() : ""}</> */}
          <Comment post={post} user={user}/>
        </div>
      </>
    )
  }

  // Show Loading and JSX
  const loading= ()=>
  {
    return(
      <section className="loading">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />{" "}
          </span>
        </h1>
      </section>
    )
  }

  // returned conditional functions and JSX
  return post && post.owner ? loaded() : loading()
}

export default Show