import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserToken } from '../utils/authToken';
import '../css/Comment.css'

const Comment = ({post, user}) => {

  const {id} = useParams();

  // State variables.    
  const [refreshPage, setRefreshPage] = useState(false)
  const [commentState, setCommentState] = useState([{}])
  const [currentPostState, setCurrentPostState] = useState({})
  const [newForm, setNewForm] = useState({
    comment: "",
    post_id: `${post._id}`,
    owner: `${user._id}`
  });

  const commentURL = 'https://foto-book.herokuapp.com/comment/'
  const postURL = `https://foto-book.herokuapp.com/post/${id}`

  const getCurrentPost= async()=>{
    try{const res= await fetch(postURL);
        const currentPost= await res.json();
        setCurrentPostState(currentPost);
    }catch(err){console.log(err)}
  }

  const getComment= async()=>{
    try{const res= await fetch(commentURL);
        const allComment= await res.json();
        setCommentState(allComment);
    }catch(err){console.log(err);}
  }

  // event handler to POST a post with newForm State input
  const handleComment= async(e)=>{
    e.preventDefault()
    // setting currentState variable as newForm state input after submit
    const currentState = {...newForm}

    try{const requestOptions={
            method: "POST", 
            headers: {'Authorization': `bearer ${getUserToken()}`,
                      "Content-Type": "application/json"},
            body: JSON.stringify(currentState)
        } 
        const response = await fetch(commentURL, requestOptions);
        const createdComment = await response.json()
        setCommentState([...commentState, createdComment])
        setNewForm({comment: "",post_id: `${post._id}`,owner: `${user._id}`})
    }catch(err){console.log(err)}
  }

  // Function that refreshes the state, thus re rendering the useEffect.
  const refreshPageFunction=()=>{
    setRefreshPage(current =>!current)
    setTimeout(function(){setRefreshPage(current => !current)}, 1000);
  }
  
  // event handler to setNewForm state to inputs when inputs are changed
  const handleChange= (e)=>{setNewForm({ ...newForm, [e.target.name]: e.target.value });};


 const loading= ()=>{
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
 
 const matchCommentToPost=()=>{ 
    return ( commentState && currentPostState ?
      <>
      {commentState.map((commentStateMap, commentStateIndex) => {
          if(commentStateMap.post_id){
            const commentsMatch = commentStateMap.post_id._id === post._id;
            return ( commentsMatch ?
              <div className="commentsOnPost" key={commentStateIndex} >
                {commentStateMap.comment}
              </div>
            : "")
          }
        }
      )}
      </>
      : loading()
    )
 }
 
 const createComment=()=>{
  return(
    <div className="createCommentDiv">
      <form onSubmit={handleComment}>
        <label>
          <input type="text"
                 value={newForm.comment}
                 name="comment"
                 placeholder="Comment.."
                 onChange={handleChange}/>
        </label>
        <input className="commentBtn" 
               type="submit" 
               value="Add Comment" 
               onClick={refreshPageFunction}/>
      </form>
    </ div>
  )
}

  // useEffect to get fire getPost function on page load
  useEffect(()=>{getComment(); getCurrentPost();}, [refreshPage])

  return(<div className='commentsContainer'>{createComment()}{matchCommentToPost()}</div>)
}

export default Comment

