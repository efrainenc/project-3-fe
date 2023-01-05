import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { getUserToken } from '../../utils/authToken';

const Post= ({user})=> 
{
  // defining state for post and for a new post form input
  const [post, setPost] = useState([]);
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

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

  // event handler to setNewForm state to inputs when inputs are changed
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  // event handler to POST a post with newForm State input
  const handleSubmit= async(e)=>
  {
  // 0. prevent default (event object method)
    e.preventDefault()

  // setting currentState variable as newForm state input after submit
    const currentState = {...newForm}

  // 1. check any fields for property data types / truthy value (function call - stretch)
    try{
        const requestOptions = {
            method: "POST", 
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"},
            body: JSON.stringify(currentState)
        } 
        // 2. specify request method , headers, Content-Type
        // 3. make fetch to BE - sending data (requestOptions)
        // 3a fetch sends the data to API - (mongo)
        const response = await fetch(BASE_URL, requestOptions);
        // 4. check our response - 
        // 5. parse the data from the response into JS (from JSON) 
        const createdPost = await response.json()
        console.log(createdPost)
        // update local state with response (json from be)
        setPost([...post, createdPost])
        // reset newForm state so that our form empties out
        setNewForm({
            name: "",
            image: "",
            title: "",
        })

    }catch(err) {
        console.log(err)
    }
  }


  // Loaded Post function
  const loaded = () =>
  {

    // JSX for creating a new post when post is loaded
    return (
      <>
      <section>
        <h2>Create a new post</h2>
        <form onSubmit={handleSubmit}>
          {/* <label>
            Name
            <input 
              type='text' 
              name='name' 
              placeholder="name"
              value={newForm.name}
              onChange={handleChange}
            />
          </label> */}
          <label>
            <input
              type="text"
              value={newForm.image}
              name="image"
              placeholder="img url"
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              value={newForm.caption}
              name="caption"
              placeholder="caption"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Create Post" />
        </form>
      </section>
      <section className='post-list'>
        {post?.map((post) =>
          {
            // console.log(user.username)
            // console.log(post.owner.username)
              if(user.username === post.owner.username){
                console.log("My Posts");
                return(
                  <div key={post._id} className='post-card'>
                    <h1>Username</h1>
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
  useEffect(()=>{getPost()}, [])

  // conditional return to return loading and loaded JSX depending on 
  return (
    <section className="post-list">{post && post.length ? loaded() : loading()}</section>
  );
}

export default Post