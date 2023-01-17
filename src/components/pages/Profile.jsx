import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserToken } from '../../utils/authToken';
import '../../scss/Profile.css'
import Post from './Post';

const Profile= ({user, loggedIn, createFollow})=>{
  // Pull Profile ID from params
  const {id} = useParams();

  // User Profiles State (this is for showing off the profile data/imgs).
  const [allProfiles, setAllProfiles] = useState(null)
  // Posts set into state
  const [post, setPost] = useState([]); // TODO pass this state to Post child to reduce state usage?
  // State to refresh page.
  const [refreshPage, setRefreshPage] = useState(false) // TODO refresh page when post component submits

  // API BASE URL to Heroku BE.
  const BASE_URL= "https://foto-book.herokuapp.com/";
  const postURL = BASE_URL + 'post';
  const profileURL = BASE_URL + 'profile';
  const followURL = BASE_URL + 'follow';

  // Fetches all posts.
  const fetchPosts= async()=>{
    try{const resPost= await fetch(postURL);
        const allPost= await resPost.json();
        setPost(allPost);
    }catch(err){console.log(err)}
  }

  // Fetches Users.
  const fetchProfile=async()=>{
    try{const resProfile= await fetch(profileURL);
        const getProfiles= await resProfile.json();
        setAllProfiles(getProfiles);
    }catch(err){console.log(err)}
  }
  
  // Function to map over posts.
  const postMap=(post)=>{
    return(
      <div key={post._id} className='profile-post-card'>
        <div className='postCaption'>
          <p>{post.caption}</p>
        </div>
        <Link className="postImage" to={`/post/${post._id}`}>
          <img src={post.image} alt={post.name}  width={400}/>
        </Link>
      </div>
    )
  }

  // Function to render user profiles on the correct pages.
  const renderUserProfiles=()=>{
    return(allProfiles ?
      allProfiles?.map((profileMap, profileMapIndex) =>{
        // For if you are on your own profile.
        const userMatch = user.username === id;
        const profileMatch = profileMap.owner.username === id

        // Correctly matches profile to current user page.
        if(profileMatch){
          // Profile display
          return (
          <div key={profileMapIndex} className='userProfile'>
            <div className='profileHeader'>
              {profileMap.headerImageProfile? <img className="headerImageProfile" src={profileMap.headerImageProfile}/>: <img className="headerImageProfile" src="https://imgur.com/bn91huk.jpg"/>}
            </div>
            <div className='profileImageContainer'>
              {profileMap.imageProfile? <img className="imageProfile" src={profileMap.imageProfile}/>: <img className="imageProfile" src="https://imgur.com/Ddet24V.jpg"/>}
            </div>
            {userMatch && loggedIn ? 
            <Link className='editProfileContainer' to={`/edit/${profileMap._id}`}>
              <p className='editProfile'>Edit Profile</p>
            </Link> 
            : ""}
            <h2 className='profileName'>{profileMap.usernameProfile}</h2>
            <p className='userName'>{userMatch ? "@"+ user.username : "@"+id}</p>
            <p className='profileBio'>{profileMap.bioProfile}</p>
          </div>
          )}
      }) : '')
  }

  // Function to show profile when all posts are loaded.
  const loaded=()=>{
    // For if you are on your own profile.
    const userMatch= user.username === id;

    return ( // TODO CSS for createPost on profile
      <>
        {renderUserProfiles()}
        <>{userMatch && loggedIn ? <Post setRefreshPageState={setRefreshPage}/> : ""}</> 
        <section className='profile-post-list'>
          {post?.map((post) =>
            {if(user.username ===! post.owner.username){return(postMap(post))
            }else if( id === post.owner.username){return(postMap(post))}
            })
          }
        </section>
      </>
    )
  };


  // For when posts are loading.
  const loading=()=>(
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
  useEffect(()=>{fetchPosts(); fetchProfile();}, [refreshPage])

  // Conditional return to return loading and loaded depending on posts.
  return(<section className="profile">{post && post.length ? loaded() : loading()}</section>);
}

export default Profile