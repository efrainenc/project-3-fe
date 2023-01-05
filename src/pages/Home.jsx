import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { getUserToken } from '../utils/authToken';

const Home= (props)=> 
{
  const [posts, setPosts] = useState([]);
  const [newForm, setNewForm] = useState({
    image: "",
    title: "",
  });

  // API URL
  const BASE_URL= "http://localhost:4000";

  // Use Post function to call in useEffect
  const getPosts= async()=>
  {
    try
    {
      const res= await fetch(BASE_URL)
      const allPeople= await res.json()
      setPosts(allPeople)
    }catch(err)
    {
      console.log(err)
    }
  }

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
        setPosts([...posts, createdPost])
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


  // Posts are Loaded
  const loaded = () =>
  {
    return (
      <>
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
              value={newForm.caption}
              name="caption"
              placeholder="caption"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Create Post" />
        </form>
      </section>
      <section className='post-list'>
        <h1>Other User Posts Here</h1>
        {posts?.map((posts) =>
          {
            return(
              <div key={posts._id} className='posts-card'>
                {/* <Link to={`/user/${posts.owner}`}>
                  <h1>{posts.owner}</h1>
                </Link> */}
                <img src={posts.image} alt={posts.name}  width={200}/>
                <h3>{posts.caption}</h3>
               </div>
            );
          })
        }
      </section>
      </>
    )
  };

  // Loading
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

  useEffect(()=>{getPosts()}, [])

  return (
    <section className="post-list">{loaded()}</section>
    // posts && posts.length ? loaded() : loading()
  );
}

export default Home