import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserToken } from '../../utils/authToken';

const UpdateUser = () => {

  const [allUsers, setAllUsers] = useState(null)
  const [editForm, setEditForm] = useState('');

  const {id} = useParams();

  //test state
  const [userURLByID, setUserURLByID] = useState()
  //const [userID, setUserID] = useState()

  const BASE_URL= "http://localhost:4000/";
  const userURL = BASE_URL + 'user';

  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };


  const getAllUsers= async()=>
  {
    try
    {
      const res= await fetch(userURL)
      const userProfJSON= await res.json()
      setAllUsers(userProfJSON)
    }catch(err)
    {
      console.log(err)
    }
  }

  const getUserIdURLS = () =>{
    if(allUsers !== null){
      allUsers?.map((allUsersMap) =>
      {
        if(allUsersMap.username === id){
          const userUpdateURL = BASE_URL + `user/${allUsersMap._id}`; // TODO this is so that I can call the right user to the db cause there is no other way to grab userID
          setUserURLByID(userUpdateURL)
        }
      })
    }
  }
  console.log(userURLByID)


  useEffect(()=>{getAllUsers();   getUserIdURLS();}, [])

  const updateUser= async(e)=>
  {
   // prevent default (event object method)
    e.preventDefault()
    try
    { 
      const options = {
        method: "PUT",
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json"},
        body: JSON.stringify(editForm)
      }
      const res= await fetch(userURL, options) // this isnt waiting for all user map
      const updatedUser= await res.json();
      console.log(updatedUser)
      setAllUsers(updatedUser);
      setEditForm(updatedUser);
    }catch(err)
    { 
      console.log(err)
    }
  }
  
  return(
    <>
    {allUsers?.map((allUsersMap, allUsersMapIndex) =>
      {
        if(allUsersMap.username === id){
          return (
            <div key={allUsersMapIndex}>
              <h2>{allUsersMap.username}</h2>
              <img width={250} src={allUsersMap.userImage} />
            </div>
          )
        }
      })
    }
    <h3>Update Profile</h3>
    <form onSubmit={updateUser}>
      <input
        type="text"
        value={editForm.userImage}
        name="userImage"
        placeholder="img url"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.username}
        name="username"
        placeholder="username"
        onChange={handleChange}
      />
      <input type="submit" value="Update"/>
    </form>
    </>
  )
}

export default UpdateUser