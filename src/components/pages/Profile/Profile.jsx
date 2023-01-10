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

  let profileOwner = ""
  let followID = ""
  const [follows, setFollows] = useState([]);

  // User Profiles State (this is for showing off the profile data/imgs).
  const [allProfiles, setAllProfiles] = useState(null)

  // API BASE URL to Heroku BE.
  const BASE_URL= "https://project-3-be.herokuapp.com/";
  const postURL = BASE_URL + 'post';
  const profileURL = BASE_URL + 'profile';
  const followURL = BASE_URL + 'follow';


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
  const getProfile= async()=>
  {
    try
    {
      // User
      const resProfile= await fetch(profileURL)
      const getProfiles= await resProfile.json()
      setAllProfiles(getProfiles)
    }catch(err)
    {
      console.log(err)
    }
  }

  // Fetches Followers
  const getFollow= async()=>
  {
    try
    {
      // User
      const resFollow= await fetch(followURL)
      const getFollows= await resFollow.json()
      setFollows(getFollows)
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
  const createPost= async(e)=>
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


  const handleFollow = async(e)=>
  {
    e.preventDefault()

    const createdUserFollow = await createFollow(createFormFunction())
  }

  // Remove Follow function with Authorization header - DELETE
  const removeFollow= async(e)=>
  {
    const unfollowURL = followURL + `/${followID}`;
    try
    {
      const options= 
      {
        method: "DELETE",
        headers: {
          'Authorization': `bearer ${getUserToken()}`},
          "Content-Type": "application/json"
      }
      const response= await fetch(unfollowURL, options);
      const deletedPost= await response.json();
    }catch(err)
    {
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

  const mapFollowers = () => {
    return( follows ?
      follows?.map((followsMap, followsMapIndex) => {
        // Grabs user 
        // For Conditionally storing my follows
        const doesOwnerHaveFollowing = followsMap.owner.username === user.username;
        // For conditionally storing users following
        const isUserProfileBeingFollowed = followsMap.following.username === id;
        const isUserProfile_NOT_BeingFollowed = followsMap.following.username !== id;
        const areWeFollowingUser = isUserProfileBeingFollowed && doesOwnerHaveFollowing
        const areWe_NOT_FollowingUser = isUserProfile_NOT_BeingFollowed && doesOwnerHaveFollowing

        //console.log(id)
        console.log(followsMap.following.username)

        if(areWeFollowingUser){
          followID = followsMap._id
          return(
            <div key={followsMapIndex} >
              <button onClick={removeFollow}>Unfollow</button>
            </div>
            )
        }
        if(areWe_NOT_FollowingUser){ // TODO FIX THIS CONDITIONAL TO ONLY SHOW IF YOU DONT FOLLOW THE PERSON OR FOLLOW NO ONE
        return(
          <div key={followsMapIndex} >
            <button onClick={handleFollow}>Follow</button>
          </div>
        ) 
        }
      }
     ) : ""
    )
  }

  // Function to render only when loggedIn.
  const signedIn=()=>{
    return(
      <>
      <h3>Create a new post</h3>
        <form onSubmit={createPost}>
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
        const userMatch = user.username === id;
        const profileMatch = profileMap.owner.username === id
        // Correctly matches profile to current user page.
        if(profileMatch){
          // sets the profile owner once matched
          profileOwner = profileMap.owner._id
          return (
          <div key={profileMapIndex} className='userImage'>
            <div className='profileHeader'>
              <img className="headerImageProfile" src={profileMap.headerImageProfile} width={500}/>
            </div>
            <img className="imageProfile" src={profileMap.imageProfile} width={150}/>
            <h2>{profileMap.usernameProfile}</h2>
            {/* You cant follow yourself */}
            {user.username !== id ? 
            <>
            {loggedIn? mapFollowers() : "Not Logged In"}
            </>
            : "You cant follow yourself"}
            <p>{profileMap.bioProfile}</p>
            {userMatch && loggedIn ? 
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

  const createFormFunction = ()=> {
    return{
        following: `${profileOwner}`, // id profile we are on
        owner: `${user._id}`
      }
  }

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
  useEffect(()=>{getPosts(); getProfile(); getFollow();}, [refreshPage])

  // Conditional return to return loading and loaded depending on posts.
  return (
    <section className="profile">
      {post && post.length ? loaded() : loading()}
    </section>
  );
}

export default Profile