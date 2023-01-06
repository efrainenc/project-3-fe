import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { getUserToken } from '../../utils/authToken';

const Home= ({user})=> 
{

  // defining state for post and for a new post form input
  const [post, setPost] = useState([]);

  // API BASE URL to mongodb backend 
  const BASE_URL= "http://localhost:4000/post";

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
  const testing = () =>
  {

    // JSX for creating a new post when post is loaded
    return (
      <>
      <section className='post-list'>
        {post?.map((post) =>
          {
            console.log(user._id)
                //console.log("My Posts");
                return(
                  <div key={post._id} className='post-card'>
                    <Link to={`/user/${user._id}`}>
                      <h1>{post.owner.username}</h1>
                    </Link>
                    <Link to={`/post/${post._id}`}>
                      <img src={post.image} alt={post.name}  width={200}/>
                    </Link>
                    <h3>{post.caption}</h3>
                    {/* <p>{post.comment}</p> */}
                   </div>
                );
          })
        }
      </section>
      </>
    )
  };

  // Loaded Post function
  const loaded = () =>
  {

    // JSX for creating a new post when post is loaded
    return (
      <>
      <section className='post-list'>
        {post?.map((post) =>
          {
            console.log(post)
                //console.log("My Posts");
                return(
                  <div key={post._id} className='post-card'>
                    <Link to={`/user/${post.owner.username}`}>
                      <h1>{post.owner.username}</h1>
                    </Link>
                    <Link to={`/post/${post._id}`}>
                      <img src={post.image} alt={post.name}  width={200}/>
                    </Link>
                    <h3>{post.caption}</h3>
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