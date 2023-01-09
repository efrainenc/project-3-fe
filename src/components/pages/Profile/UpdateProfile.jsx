import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserToken } from '../../../utils/authToken';

const UpdateProfile = ({user}) => {


  const {id} = useParams();

  // setting all profiles to state (to update them)
  const [profileState, setProfileState] = useState(null)
  const [editForm, setEditForm] = useState({
    owner: `${user._id}`
  });

  const navigate = useNavigate();


  const BASE_URL= "http://localhost:4000/";
  const profileURL = BASE_URL + `profile/${id}`;


  console.log(profileURL)
  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };


  const getProfile= async()=>
  {
    try
    {
      const res= await fetch(profileURL)
      const userProfJSON= await res.json()
      setProfileState(userProfJSON)
    }catch(err)
    {
      console.log(err)
    }
  }

  const updateProfile= async(e)=>
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
      const res= await fetch(profileURL, options) // this isnt waiting for all user map
      const updatedProfile= await res.json();
      console.log(updatedProfile)
      setProfileState(updatedProfile);
      setEditForm(updatedProfile);
      navigate(-1)
    }catch(err)
    { 
      console.log(err)
    }
  }

  useEffect(()=>{getProfile();}, [])
  
  return(
    <>
    <h3>Update Profile</h3>
    <form onSubmit={updateProfile}>
      <input
        type="text"
        value={editForm.usernameProfile}
        name="usernameProfile"
        placeholder="username"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.imageProfile}
        name="imageProfile"
        placeholder="img url"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.headerImageProfile}
        name="headerImageProfile"
        placeholder="header img url"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.bioProfile}
        name="bioProfile"
        placeholder="bio"
        onChange={handleChange}
      />
      <input type="submit" value="Update"/>
    </form>
    </>
  )
}

export default UpdateProfile