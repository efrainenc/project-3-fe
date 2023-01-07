import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Comment = () => {

  const {id} = useParams();

  const [commentState, setCommentState] = useState([{}])
  const [currentPostState, setCurrentPostState] = useState({})

  const commentURL = 'http://localhost:4000/comment/'
  const postURL = `http://localhost:4000/post/${id}`

  const getCurrentPost= async()=>
  {
    try
    {
      const res= await fetch(postURL)
      const currentPost= await res.json()
      setCurrentPostState(currentPost)
    }catch(err)
    {
      console.log(err)
    }
  }

  const getComment= async()=>
  {
    try
    {
      const res= await fetch(commentURL)
      const allComment= await res.json()
      setCommentState(allComment)
    }catch(err)
    {
      console.log(err)
    }
  }

 // useEffect to get fire getPost function on page load
 useEffect(()=>{getComment(); getCurrentPost();}, [])
 
 const matchCommentToPost = () => { 
  return ( commentState && currentPostState ?
    <>
    {commentState.map((commentStateMap, commentStateIndex) => {
      
        return (
          <div key={commentStateIndex} >
            {commentStateMap.comment}
          </div>
        )  
    }
    )}
    </>
    :
    <p> no comments </p>
  )
  }


  return ( <div>
    { matchCommentToPost()}
  </div>
   
  )
}

export default Comment

