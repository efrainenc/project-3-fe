import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const Home= ({})=>{
  // defining state for post and for a new post form input
  const [post, setPost] = useState([]);
  // User Profiles State (this is for showing off the profile data/imgs).
  const [allProfiles, setAllProfiles] = useState(null)


  // useEffect to store post JSON as setPost state
  const fetchPost= async()=>{
    try{const res= await fetch("https://project-3-be.herokuapp.com/post")
        const allPost= await res.json()
        setPost(allPost)
    }catch(err){console.log(err)}
  }

  // Fetches Users.
  const fetchProfile= async()=>{
    try{const res= await fetch("https://project-3-be.herokuapp.com/profile")
        const getProfiles= await res.json()
        setAllProfiles(getProfiles)
    }catch(err){console.log(err)}
  }

  const getProfilePictures=(postMap)=>{
    return ( allProfiles ?
      allProfiles?.map((profileMap, profileMapIndex) =>{
        if(profileMap.owner.username === postMap.owner.username){
          return(
          <>
            {profileMap.imageProfile? <img className="homePfp" width={40} height={40} src={profileMap.imageProfile}/>: <img className="homePfp" width={40} height={40} src="https://imgur.com/Ddet24V.jpg"/>}
          </>)
        }
      }): "")
  }

  // Loaded Post function
  const loaded=()=>{
    return(
      <section>
        {post?.map((postMap) =>{
          return(
            <div key={postMap._id} className='post-card'>
              {getProfilePictures(postMap)}
              <Link className="postCardUsername" to={`/${postMap.owner.username}`}>
                <h1>{postMap.owner.username}</h1>
              </Link>
              <div className='postCaption'>
                <p>{postMap.caption}</p>
              </div>
              <Link className="postImage" to={`/post/${postMap._id}`}>
                <img src={postMap.image} alt={postMap.name}  width={400}/>
              </Link>
            </div>
          );
          })
        }
      </section>
    )
  };

  // / JSX for creating a new post when post is loading
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
  


  // useEffect to call fetchPost function on page load
  useEffect(()=>{fetchPost(); fetchProfile();}, [])

  // conditional return to return loading and loaded JSX depending on 
  return(<section className="post-list">{post && post.length ? loaded() : loading()}</section>);
}

export default Home