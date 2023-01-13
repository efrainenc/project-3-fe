import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserToken } from '../../utils/authToken';
import '../../css/Profile.css'

const Profile= ({user, loggedIn, createFollow})=>{
  // Pull Profile ID from params
  const {id} = useParams();

  // User Profiles State (this is for showing off the profile data/imgs).
  const [allProfiles, setAllProfiles] = useState(null)
  // Posts set into state
  const [post, setPost] = useState([]);
  // State to refresh page.
  const [refreshPage, setRefreshPage] = useState(false)
  const [newForm, setNewForm] = useState({
    image: "",
    title: "",
  });

  // API BASE URL to Heroku BE.
  const BASE_URL= "https://project-3-be.herokuapp.com/";
  const postURL = BASE_URL + 'post';
  const profileURL = BASE_URL + 'profile';
  const followURL = BASE_URL + 'follow';

  // Fetches all posts.
  const getPosts= async()=>{
    try{const resPost= await fetch(postURL);
        const allPost= await resPost.json();
        setPost(allPost);
    }catch(err){console.log(err)}
  }

  // Fetches Users.
  const getProfile=async()=>{
    try{const resProfile= await fetch(profileURL);
        const getProfiles= await resProfile.json();
        setAllProfiles(getProfiles);
    }catch(err){console.log(err)}
  }
  
  // Function that refreshes the state, thus re rendering the useEffect.
  const refreshPageFunction=()=>{
    setRefreshPage(current=>!current);
    setTimeout(function(){setRefreshPage(current=>!current)}, 1000);
  }

  // Event handler to setNewForm state to inputs when inputs are changed.
  const handleChange=(e)=>{setNewForm({ ...newForm, [e.target.name]: e.target.value });};

  // Event handler to POST a post with newForm State input.
  const createPost= async(e)=>{
    e.preventDefault()
    // setting currentState variable as newForm state input after submit.
    const currentState = {...newForm}

    try{const requestOptions={method:"POST",headers: {'Authorization': `bearer ${getUserToken()}`,"Content-Type": "application/json"},body: JSON.stringify(currentState)} 
        const response = await fetch(postURL, requestOptions);
        const createdPost = await response.json()
        setPost([...post, createdPost])
        setNewForm({image: "",title: "",})
    }catch(err){console.log(err)}
  }
  
  // Function to map over posts.
  const postMap=(post)=>{
    return(
      <div key={post._id} className='post-card'>
        <div className='postCaption'>
          <p>{post.caption}</p>
        </div>
        <Link className="postImage" to={`/post/${post._id}`}>
          <img src={post.image} alt={post.name}  width={400}/>
        </Link>
      </div>
    )
  }

  // Function to render only when loggedIn.
  const signedIn=()=>{
    return(
      <div className='createPost'>
      <h3>Create a new post</h3>
        <form onSubmit={createPost}>
          <label>
            <input type="text"
                   className='postInput'
                   value={newForm.image}
                   name="image"
                   placeholder="Img url.."
                   onChange={handleChange}/>
          </label>
          <label>
            <input type="text"
                   className='postInput'
                   value={newForm.caption}
                   name="caption"
                   placeholder="Caption.."
                   onChange={handleChange}/>
          </label>
          <input className="createPostButton" 
                 type="submit" 
                 value="Create Post" 
                 onClick={refreshPageFunction}/>
        </form>
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
          <div key={profileMapIndex} className='userImage'>
            <div className='profileHeader'>
              {profileMap.headerImageProfile? <img className="headerImageProfile" src={profileMap.headerImageProfile}/>: <img className="headerImageProfile" src="https://imgur.com/bn91huk.jpg"/>}
            </div>
            <div className='profileImageContainer'>
              {profileMap.imageProfile? <img className="imageProfile" src={profileMap.imageProfile}/>: <img className="imageProfile" src="https://imgur.com/Ddet24V.jpg"/>}
            </div>
            <h2>{profileMap.usernameProfile}</h2>
            <p>{userMatch ? "@"+ user.username : "@"+id}</p>
            <p>{profileMap.bioProfile}</p>
            {userMatch && loggedIn ? 
            <Link className='editProfileContainer' to={`/edit/${profileMap._id}`}>
              <p className='editProfile'>Edit Profile</p>
            </Link> 
            : ""}
          </div>
          )}
      }) : '')
  }

  // Function to show profile when all posts are loaded.
  const loaded=()=>{
    // For if you are on your own profile.
    const userMatch= user.username === id;

    return (
      <>
      <div className='user'>
        {renderUserProfiles()}
        <>{userMatch && loggedIn ? signedIn() : ""}</>
      </div>
      <section className='post-list'>
          {post?.map((post) =>
            {if(user.username ===! post.owner.username){return (postMap(post))
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
  useEffect(()=>{getPosts(); getProfile();}, [refreshPage])

  // Conditional return to return loading and loaded depending on posts.
  return(<section className="profile">{post && post.length ? loaded() : loading()}</section>);
}

export default Profile