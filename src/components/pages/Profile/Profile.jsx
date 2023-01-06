import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserToken } from '../../../utils/authToken';
import Welcome from '../Welcome'

const Profile= ({user, loggedIn})=> 
{
  //loggedIn is Boolean
  // State variables.    
  const [refreshPage, setRefreshPage] = useState(false)
  
  // take in the ID parameter from router URL linked from Post.jsx
  const {id} = useParams();

  // const [userState, setUser] = useState([]);
  // // sets post show route URL as variable and dependent ID from useParams
  // const URL = `http://localhost:4000/user/${id}`;

  // const getUser= async()=>
  // {
  //   try
  //   {
  //     const res= await fetch(URL)
  //     const someUser= await res.json()
  //     setUser(someUser)
  //   }catch(err)
  //   {
  //     console.log(err)
  //   }
  // }

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
  const [newForm, setNewForm] = useState({
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
            image: "",
            title: "",
        })

    }catch(err) {
        console.log(err)
    }
  }
  
  const postMap=(post)=>{
    return(
        <div key={post._id} className='post-card'>
          <Link to={`/post/${post._id}`}>
            <img src={post.image} alt={post.name}  width={200}/>
          </Link>
          <h3>{post.caption}</h3>
        </div>
    )
  }

  const myUser=()=>{
    return(
      <>
      <h2>Create a new post</h2>
        <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Create Post" onClick={refreshPageFunction}/>
        </form>
      </>
    )
  }

  // Signed In Post function
  const signedIn = () =>
  {
      return(
      <>
        <section className='post-list'>
          {post?.map((post) =>
            {if(user.username ===! post.owner.username){ // DRY THISSS ALL UPPPP
              return (
                postMap(post)
              )
              }else if( id === post.owner.username){
                return (
                  postMap(post)
                )
              }
            })
          }
        </section>
      </>
      )
  }


  const signedOut = () =>
  {
    // JSX for creating a new post when post is loaded
    return (
      <section className='post-list'>
        {post?.map((post) =>
          {if(id === post.owner.username){
              return (
                postMap(post)
              )
            }
          })
        }
      </section>
    )
  };

  const loaded = () =>
  {
    // JSX for creating a new post when post is loaded
    return (
      <>
      <>{user.username === id && loggedIn ? myUser() : ""}</>
      <h1>{user.username === id ? user.username : id}'s page</h1>
      <>{loggedIn ? signedIn() : signedOut()}</>
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
  // // useEffect for User
  // useEffect(()=>{getUser()}, [refreshPage])

  // conditional return to return loading and loaded JSX depending on 
  return (
    <section className="post-list">
      {post && post.length ? loaded() : loading()}
    </section>
  );
}

export default Profile