import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { getUserToken } from '../../../utils/authToken';

const Home= ({})=>
{

  // defining state for post and for a new post form input
  const [post, setPost] = useState([]);

  // API BASE URL to mongodb backend 
  const BASE_URL= "https://project-3-be.herokuapp.com/post";

  // useEffect to store post JSON as setPost state
  const getPost= async()=>
  {
    try
    {
      const res= await fetch(BASE_URL)
      const allPost= await res.json()
      setPost(allPost)
    }catch(err)
    {
      console.log(err)
    }
  }

  // Loaded Post function
  const loaded = () =>
  {
    // JSX for creating a new post when post is loaded
    return (
      <>
      <section className='post-list'>
        {post?.map((post) =>
          {
            return(
              <div key={post._id} className='post-card'>
                <Link to={`/${post.owner.username}`}>
                  <h1>{post.owner.username}</h1>
                </Link>
                <Link to={`/post/${post._id}`}>
                  <img src={post.image} alt={post.name}  width={200}/>
                </Link>
                <p>{post.caption}</p>
                {/* <p>{post.comment}</p> */}
              </div>
            );
          })
        }
      </section>
      </>
    )
  };

  // / JSX for creating a new post when post is loading
  const loading = () => (
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
  );
  


  // useEffect to call getPost function on page load
  useEffect(()=>{getPost()}, [])

  // conditional return to return loading and loaded JSX depending on 
  return (
    <section className="post-list">{post && post.length ? loaded() : loading()}</section>
  );
}

export default Home