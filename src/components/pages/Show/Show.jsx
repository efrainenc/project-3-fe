import React from 'react'
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUserToken } from '../../../utils/authToken'
import Comment from '../../Comment/Comment'
import '../../../css/Show.css'

const Show= ({user})=>{
  // Pull Post ID from params
  const {id} = useParams();
  const navigate = useNavigate();
  
  // Setting fetched post by id to state
  const [post, setPost] = useState(null);
  const [editForm, setEditForm] = useState(post);

  // sets post show route URL as variable and dependent ID from useParams
  const URL=`https://project-3-be.herokuapp.com/post/${id}`;

  // event handler for when UPDATE name and title are changed
  const handleChange=(e)=>{setEditForm({ ...editForm, [e.target.name]: e.target.value })}

  // function to fetch show post details for useEffect - and set post detail JSON to setPost and setEditForm State
  const fetchPost= async()=>{
    try{const response = await fetch(URL);
        const foundPost = await response.json();
        setPost(foundPost);
        setEditForm(foundPost);
    }catch(err){console.log(err)}
  }
 
  // Update Post (PUT) function 
  const updatePost= async(e)=>{
    e.preventDefault()
    try{const options= {method: "PUT",headers: {'Authorization': `Bearer ${getUserToken()}`,"Content-Type": "application/json"},body: JSON.stringify(editForm)}
        const response= await fetch(URL, options);
        const updatedPost= await response.json();
        setPost(updatedPost);
        setEditForm(updatedPost);
        navigate(-1);
    }catch(err){console.log(err);navigate(URL)}
  }

  // Remove Post function with Authorization header - DELETE
  const removePost= async(e)=>{
    try{const options={method: "DELETE",headers: {'Authorization': `Bearer ${getUserToken()}`},"Content-Type": "application/json"}
        const response= await fetch(URL, options);
        const deletedPost= await response.json();
        navigate(-1);
    }catch(err){console.log(err);navigate(URL)}
  }

  // Fetch posts on page load
  useEffect(()=>{fetchPost();}, [])

  // Only show remove post when signed in
  const signedIn=()=>{
    return(
      <div className='deleteButtonContainer'>
        <button className="delete" onClick={removePost}>Remove Post</button>
      </div>
    )
  }

  // Show Details Loaded function and JSX
  const loaded=()=>{
    return(
      <div className="postShow">
        <div className="postDiv">
          <Link to={`/${post.owner.username}`}>
            <h2 className="userNamePostLink"> @ {post.owner.username}</h2>
          </Link>
          <img src={post.image}/>
          <h2>{post.caption}</h2>
        </div>
        <>{user.username === post.owner.username ? signedIn() : ""}</>
        <Comment post={post} user={user}/>
      </div>
    )
  }

  // Show Loading and JSX
  const loading=()=>{
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

  // Show loaded when post and owner exist
  return post && post.owner ? loaded() : loading()
}
export default Show