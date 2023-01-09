import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserToken } from '../../../utils/authToken';
import './Profile.css'

const Profile= ({user, loggedIn, createFollow})=> // TODO Create Follow when you click follow on someones profile
{
  // State to refresh page.
  const [refreshPage, setRefreshPage] = useState(false)
  
  // Take in the ID parameter from router URL linked from Post.jsx.
  const {id} = useParams();

  // defining state for post and for a new post form input.
  const [post, setPost] = useState([]);
  const [newForm, setNewForm] = useState({
    image: "",
    title: "",
  });

  const [followForm] = useState({
    following: [],
    owner: `${user.username}`
  });

  // User Profiles State (this is for showing off the profile data/imgs).
  const [allProfiles, setAllProfiles] = useState(null)
  // API BASE URL to Heroku BE.
  const BASE_URL= "https://project-3-be.herokuapp.com/";
  const postURL = BASE_URL + 'post';
  const profileURL = BASE_URL + 'profile';

  // Fetches all posts.
  const getPosts= async()=>
  {
    try
    {
      //Post
      const resPost= await fetch(postURL)
      const allPost= await resPost.json()
      setPost(allPost)
    }catch(err)
    {
      console.log(err)
    }
  }

  // Fetches Users.
  const getUser= async()=>
  {
    try
    {
      // User
      const resUser= await fetch(profileURL)
      const getUsers= await resUser.json()
      setAllProfiles(getUsers)
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
      }, 1000);
  }

  // Event handler to setNewForm state to inputs when inputs are changed.
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  // Event handler to POST a post with newForm State input.
  const handlePost= async(e)=>
  {
    e.preventDefault()
    // setting currentState variable as newForm state input after submit.
    const currentState = {...newForm}

    try{
        // Specifying request method , headers, Content-Type.
        const requestOptions = {
            method: "POST", 
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"},
            body: JSON.stringify(currentState)
        } 
        // post fetch.
        const response = await fetch(postURL, requestOptions);

        // TODO const createdUserFollow = await createFollow(followForm)

        // Parse the data from the response into JS (from JSON).
        const createdPost = await response.json()
        // Update local state with response (json from be).
        setPost([...post, createdPost])
        // Reset newForm state so that our form empties out.
        setNewForm({
            image: "",
            title: "",
        })
    }catch(err){
        console.log(err)
    }
  }
  
  // Function to map over posts.
  const postMap=(post)=>{
    return(
        <div key={post._id} className='post-card'>
          <Link to={`/post/${post._id}`}>
            <img src={post.image} alt={post.name}  width={200}/>
          </Link>
          <p>{post.caption}</p>
        </div>
    )
  }

  // Function to render only when loggedIn.
  const signedIn=()=>{
    return(
      <>
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

  // Function to render user profiles on the correct pages.
  const renderUserProfiles= ()=>{
    return ( allProfiles ?
      allProfiles?.map((profileMap, profileMapIndex) =>
      {
        // For if you are on your own profile.
        const updateMatch = user.username === id;

        // Correctly matches profile to other users.
        if(profileMap.owner.username === id){
          return (
          <div key={profileMapIndex} className='userImage'>
            <div className='profileHeader'>
              <img className="headerImageProfile" src={profileMap.headerImageProfile} width={500}/>
            </div>
            <img className="imageProfile" src={profileMap.imageProfile} width={150}/>
            <h2>{profileMap.usernameProfile}</h2>
            <p>{profileMap.bioProfile}</p>
            {updateMatch && loggedIn ? 
            <Link to={`/update/${profileMap._id}`}>
              <p>Update Profile</p>
            </Link> 
            : ""}
          </div>
          )
        }
      })
    : '')
  }

  // Function to show profile when all posts are loaded.
  const loaded = () =>
  {
    // For if you are on your own profile.
    const userMatch = user.username === id;

    return (
      <>
      <div className='user'>
        {renderUserProfiles()}
        <h3>{userMatch ? "@"+ user.username : "@"+id}</h3>
        <div className='createPost'>{userMatch && loggedIn ? signedIn() : ""}</div>
      </div>
      <section className='post-list'>
          {post?.map((post) =>
            {if(user.username ===! post.owner.username){
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

  // For when posts are loading.
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

  // useEffect to call getPosts function on page load
  useEffect(()=>{getPosts(); getUser();}, [refreshPage])

  // Conditional return to return loading and loaded depending on posts.
  return (
    <section className="profile">
      {post && post.length ? loaded() : loading()}
    </section>
  );
}

export default Profile