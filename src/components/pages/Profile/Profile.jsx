import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserToken } from '../../../utils/authToken';
import './Profile.css'

const Profile= ({user, loggedIn})=> 
{
  //loggedIn is Boolean
  // State variables.    
  const [refreshPage, setRefreshPage] = useState(false)
  
  // take in the ID parameter from router URL linked from Post.jsx
  const {id} = useParams();

  // defining state for post and for a new post form input
  const [post, setPost] = useState([]);
  const [newForm, setNewForm] = useState({
    image: "",
    title: "",
  });

  // form to change user profile data
  const [userUpdate, setUserUpdate] = useState([])
  const [userForm, setUserForm] = useState({
    userImage: "",
    username: "",
  });

  // API BASE URL to mongodb backend 
  const BASE_URL= "http://localhost:4000/";
  const postURL = BASE_URL + 'post';
  let userURL = BASE_URL + 'user';
  if(loggedIn){
    userURL = BASE_URL + `user/${user._id}`;
  }
  //console.log(userURL)

  // useEffect to store post JSON as setPost state
  const getProfile= async()=>
  {
    try
    {
      //Post
      const resPost= await fetch(postURL)
      const allPost= await resPost.json()
      setPost(allPost)
      // User
      const resUser= await fetch(userURL)
      const allUser= await resUser.json()
      setUserUpdate(allUser)
    }catch(err)
    {
      console.log(err)
    }
  }
  
  // Function that refreshes the state, thus re rendering the useEffect.
  const refreshPageFunction = () => 
  {
    setRefreshPage(current => !current)
      setTimeout(function() 
      {
        setRefreshPage(current => !current)
      }, 1);
  }

  // event handler to setNewForm state to inputs when inputs are changed
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // event handler to POST a post with newForm State input
  const handlePost= async(e)=>
  {
  // 0. prevent default (event object method)
    e.preventDefault()
  // setting currentState variable as newForm state input after submit
    const currentState = {...newForm}

  // 1. check any fields for property data types / truthy value (function call - stretch)
    try{
        // 2. specify request method , headers, Content-Type
        const requestOptions = {
            method: "POST", 
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"},
            body: JSON.stringify(currentState)
        } 
        // 3. make fetch to BE - sending data (requestOptions)
        const response = await fetch(postURL, requestOptions);
        // 3a fetch sends the data to API - (mongo)
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
    }catch(err){
        console.log(err)
    }
  }

  const handleUser= async(e)=>
  {
    // prevent default (event object method)
    e.preventDefault()
    
    const currUserState = {...userForm}

    try
    { 
      // USER 
      const userRequestOptions = {
        method: "PUT", 
        headers: {
            'Authorization': `bearer ${getUserToken()}`,
            "Content-Type": "application/json"},
        body: JSON.stringify(currUserState)
      }

      const userResponse = await fetch(userURL, userRequestOptions)
      const updatedUser = await userResponse.json()
      setUserUpdate(updatedUser)
      setUserForm({
        userImage: "",
        username: "",
      })
    }catch(err){ 
      console.log(err)
    }
  }
  
  const postMap=(post)=>{
    return(
      <>
        <div key={post._id} className='post-card'>
          <Link to={`/post/${post._id}`}>
            <img src={post.image} alt={post.name}  width={200}/>
          </Link>
          <p>{post.caption}</p>
        </div>
      </>
    )
  }

  const signedIn=()=>{ //ADD EDIT PROFILE PRICTURE TO PROFILE PAGE
    return(
      <>
      <h3>Update Profile</h3>
      <form onSubmit={handleUser}>
        <input
          type="text"
          value={userForm.avatar}
          name="avatar"
          placeholder="img url"
          onChange={handleChange}
        />
        <input
          type="text"
          value={userForm.username}
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input type="submit" value="Update" onClick={refreshPageFunction}/>
      </form>
      <h3>Create a new post</h3>
        <form onSubmit={handlePost}>
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

  const loaded = () =>
  {
    // JSX for creating a new post when post is loaded
    return (
      <>
      {/* user.avatar */}
      <div className='user'>
        <img className="avatar" src='https://www.w3schools.com/howto/img_avatar.png' width={150}/>
        <h1>{user.username === id ? user.username : id}</h1>
        <div className='createPost'>{user.username === id && loggedIn ? signedIn() : ""}</div>
      </div>
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

  // useEffect to call getProfile function on page load
  useEffect(()=>{getProfile()}, [refreshPage])
  // useEffect to call getProfile function on page load
  // useEffect(()=>{getUser()}, [refreshPage])

  // conditional return to return loading and loaded JSX depending on 
  return (
    <section className="profile">
      {post && post.length ? loaded() : loading()}
    </section>
  );
}

export default Profile