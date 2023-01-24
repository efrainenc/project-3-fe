import React from 'react'
import {useState, useEffect} from 'react'
import { getUserToken } from '../../utils/authToken';
import '../../scss/Profile.css'

const Post=({setRefreshPageState})=>{
  // Posts set into state
  // User Profiles State (this is for showing off the profile data/imgs).
  const [allProfiles, setAllProfiles] = useState(null)
  const [post, setPost] = useState([]);
  const [newForm, setNewForm] = useState({
    image: "",
    title: "",
  });
  // API BASE URL to Heroku BE.
  const postURL= "https://foto-book.herokuapp.com/post";

  // Fetches all posts.
  const fetchPosts= async()=>{
    try{const resPost= await fetch(postURL);
        const allPost= await resPost.json();
        setPost(allPost);
    }catch(err){console.log(err)}
  }
  // Fetches Users.
  const fetchProfile= async()=>{
    try{const res= await fetch("https://foto-book.herokuapp.com/profile")
        const getProfiles= await res.json()
        setAllProfiles(getProfiles)
    }catch(err){console.log(err)}
  }

  const getProfilePictures=(postMap)=>{
    return ( allProfiles ?
      allProfiles?.map((profileMap) =>{
        if(profileMap.owner.username === postMap.owner.username){
          return(
          <>
            {profileMap.imageProfile? <img className="homePfp" width={40} height={40} src={profileMap.imageProfile}/>: <img className="homePfp" width={40} height={40} src="https://imgur.com/Ddet24V.jpg"/>}
          </>)
        }
      }): "")
  }
  
  // Function that refreshes the state, thus re rendering the useEffect.
  const refreshPageFunction=()=>{
    setRefreshPageState(current=>!current);
    setTimeout(function(){setRefreshPageState(current=>!current)}, 1000);
  }

  // Event handler to setNewForm state to inputs when inputs are changed.
  const handleChange=(e)=>{setNewForm({ ...newForm, [e.target.name]: e.target.value });};

  // Event handler to POST a post with newForm State input.
  const createPost= async(e)=>{
    e.preventDefault()
    // setting currentState variable as newForm state input after submit.
    const currentState = {...newForm}

    try{const options={
          method:"POST",
          headers: {'Authorization': `Bearer ${getUserToken()}`,"Content-Type": "application/json"},
          body: JSON.stringify(currentState)} 
        const response = await fetch(postURL, options);
        const createdPost = await response.json()
        setPost([...post, createdPost])
        setNewForm({image: "",title: "",})
    }catch(err){console.log(err)}
  }

  // useEffect to call getPosts function on page load
  useEffect(()=>{fetchPosts(); fetchProfile();},[])


  return(
      <div className='createPost'>
        {getProfilePictures}
        <h3>Post something new!</h3>
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
                value="Post" 
                onClick={refreshPageFunction}/>
        </form>
      </div>
  )
}

export default Post