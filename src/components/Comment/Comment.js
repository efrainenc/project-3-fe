import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserToken } from '../../utils/authToken';

const Comment = ({post, user}) => {

  const {id} = useParams();

  // State variables.    
  const [refreshPage, setRefreshPage] = useState(false)
  const [newForm, setNewForm] = useState({
    comment: "",
    post_id: `${post._id}`,
    owner: `${user._id}`
  });

  const [commentState, setCommentState] = useState([{}])
  const [currentPostState, setCurrentPostState] = useState({})

  const commentURL = 'https://project-3-be.herokuapp.com/comment/'
  const postURL = `https://project-3-be.herokuapp.com/post/${id}`

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

  // event handler to POST a post with newForm State input
  const handleComment= async(e)=>
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
        const response = await fetch(commentURL, requestOptions);
        // 3a fetch sends the data to API - (mongo)
        // 4. check our response - 
        // 5. parse the data from the response into JS (from JSON) 
        const createdComment = await response.json()
        // update local state with response (json from be)
        setCommentState([...commentState, createdComment])
        // reset newForm state so that our form empties out
        setNewForm({
          comment: "",
          post_id: `${post._id}`,
          owner: `${user._id}`
        })
    }catch(err){
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
  
  // event handler to setNewForm state to inputs when inputs are changed
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };


 const loading= ()=>
 {
   return(
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
   )
 }
 
 const matchCommentToPost = () => { 
    return ( commentState && currentPostState ?
      <>
      {commentState.map((commentStateMap, commentStateIndex) => {
          if(commentStateMap.post_id){
            const commentsMatch = commentStateMap.post_id._id === post._id;
            return ( commentsMatch ?
              <div key={commentStateIndex} >
                {commentStateMap.comment}
              </div>
            : "")
          }
        }
      )}
      </>
      :
      loading()
    )
 }
 
 const createComment=()=>{ //ADD EDIT PROFILE PRICTURE TO PROFILE PAGE
  return(
    <>
    <h3>Create a new comment</h3>
      <form onSubmit={handleComment}>
        <label>
          <input
            type="text"
            value={newForm.comment}
            name="comment"
            placeholder="comment"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Create Comment" onClick={refreshPageFunction}/>
      </form>
    </>
  )
}

  // useEffect to get fire getPost function on page load
  useEffect(()=>{getComment(); getCurrentPost();}, [refreshPage])

  return ( <div>
    { matchCommentToPost()}
    {createComment()}
  </div>
   
  )
}

export default Comment

