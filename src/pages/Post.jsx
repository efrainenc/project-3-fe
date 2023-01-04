import React from 'react'
import {useState, useEffect} from 'react'
import { getUserToken } from '../utils/authToken';

const Post = () => {

  const [newForm, setNewForm] = useState({
    image: "",
    title: "",
  });

  // API URL
  const BASE_URL= "http://localhost:4000";

  // Handlers
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const handleSubmit= async(e)=>
  {
    e.preventDefault()
    const currentState = {...newForm}
    try{
        const requestOptions ={
            method: "POST", 
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentState)
        } 
        // 2. specify request method , headers, Content-Type
        // 3. make fetch to BE - sending data (requestOptions)
        // 3a fetch sends the data to API - (mongo)
        const response = await fetch(BASE_URL, requestOptions);
        
        const createdPost = await response.json()
        console.log(createdPost)
        // update local state with response (json from be)
        //setPosts([...posts, createdPost])
        // reset newForm state so that our form empties out
        setNewForm({
            name: "",
            image: "",
            title: "",
        })

    }catch(err) {
        console.log(err)
    }
  }



  return (
    <div>
      <h1>Post Page</h1>
      <section>
        <h2>Create a new Post</h2>
        <form onSubmit={handleSubmit}>
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
              value={newForm.title}
              name="caption"
              placeholder="caption"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Create Post" />
        </form>
      </section>
    </div>
  )
}

export default Post