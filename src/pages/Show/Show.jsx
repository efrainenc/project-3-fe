import React from 'react'
import { useState, useEffect } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
import { getUserToken } from '../../utils/authToken'



const Show= (props)=>
{
  //set state for post details and form changes for UPDATE ROUTE
  const [post, setPost]= useState(null);
  const [editForm, setEditForm] = useState(post);

  // take in the ID parameter from router URL linked from Post.jsx
  const {id} = useParams();

  // useNavigate returns an imperative method that you can use for changing location.
  const navigate = useNavigate();

  // sets post show route URL as variable and dependent ID from useParams
  const URL = `http://localhost:4000/post/${id}`;

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
    
    console.log(getUserToken())

    try
    { 
      const options = {
        method: "PUT",
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json"},
        body: JSON.stringify(editForm)
      }
      
      const response= await fetch(URL, options);
      const updatedPost= await response.json();
      console.log(updatedPost)
      setPost(updatedPost);
      setEditForm(updatedPost);
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
      // console.log(deletedPost);
      navigate("/");
    }catch(err)
    {
      console.log(err)
      navigate(URL)
    }
  }

  // useEffect to get fire getPost function on page load
  useEffect(()=>{getPost()}, [])

  // Show Details Loaded function and JSX
  const loaded= ()=>
  {
    return(
      <>
      <section>
        <div className="post">
          <h1>Show Page</h1>
          <h2>{post.name}</h2>
          <h2>{post.title}</h2>
          <div>
            <button className="delete" onClick={removePost}>
              Remove Post
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2>Edit this Post</h2>
        <form onSubmit={updatePost}>
          <input
              type="text"
              value={editForm.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
          />
          <input
              type="text"
              value={editForm.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
          />
          <input type="submit" value="Update Post" />
        </form> 
      </section>
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
  return post ? loaded() : loading()
}

export default Show