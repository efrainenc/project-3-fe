import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserToken } from '../../../utils/authToken';
import '../../../css/UpdateProfile.css'

const UpdateProfile = ({user}) => {


  const {id} = useParams();

  // setting all profiles to state (to update them).
  const [profileState, setProfileState] = useState(null)
  const [editForm, setEditForm] = useState({
    owner: `${user._id}`
  });

  const navigate = useNavigate();

  // Heroku URL for Profile by ID.
  const BASE_URL= "https://project-3-be.herokuapp.com/";
  const profileURL = BASE_URL + `profile/${id}`;

  // Event handler to setNewForm state to inputs when inputs are changed.
  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Fetches all Profiles.
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

  // Function to update profile.
  const updateProfile= async(e)=>
  {
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
      const res= await fetch(profileURL, options)
      const updatedProfile= await res.json();
      setProfileState(updatedProfile);
      setEditForm(updatedProfile);
      navigate(-1)
    }catch(err)
    { 
      console.log(err)
    }
  }

  useEffect(()=>{getProfile();}, [])
  
  // Returns Update Profile Form.
  return(
    <div className="updateProfileDiv">
    <h3>Update Profile</h3>
    <form onSubmit={updateProfile}>
      <input
        type="text"
        value={editForm.usernameProfile}
        name="usernameProfile"
        placeholder="Update Username"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.imageProfile}
        name="imageProfile"
        placeholder="Update Img URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.headerImageProfile}
        name="headerImageProfile"
        placeholder="Update Header Img URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.bioProfile}
        name="bioProfile"
        placeholder="Update Bio"
        onChange={handleChange}
      />
      <input className="updateProfileBtn" type="submit" value="Update"/>
    </form>
    </ div>
  )
}

export default UpdateProfile