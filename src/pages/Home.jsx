import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { getUserToken } from '../utils/authToken';

const Home= ({user})=> 
{
  console.log(user)
  // State variables.    
  const [refreshPage, setRefreshPage] = useState(false)

  // Function that refreshes the state, thus re rendering the useEffect.
  const refreshPageFunction = () => 
  {
    setRefreshPage(current => !current)
      setTimeout(function() 
      {
        setRefreshPage(current => !current)
      }, 1);
  }

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
  const loaded = () =>
  {

    // JSX for creating a new post when post is loaded
    return (
      <>
      <section className='post-list'>
        {post?.map((post) =>
          {
            // console.log(post.owner.username)
              if(post.owner.username === post.owner.username){
                //console.log("My Posts");
                return(
                  <div key={post._id} className='post-card'>
                    <h1>{post.owner.username}</h1>
                    <Link to={`/post/${post._id}`}>
                      <img src={post.image} alt={post.name}  width={200}/>
                    </Link>
                    <h3>{post.caption}</h3>
                   </div>
                );
              }
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
  useEffect(()=>{getPost()}, [refreshPage])

  // conditional return to return loading and loaded JSX depending on 
  return (
    <section className="post-list">{post && post.length ? loaded() : loading()}</section>
  );
}

export default Home