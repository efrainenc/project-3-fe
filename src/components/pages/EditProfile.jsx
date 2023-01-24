import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserToken } from '../../utils/authToken';
import '../../scss/EditProfile.css'

const EditProfile=({user})=>{
  // Pull Profile ID from params
  const {id}= useParams();
  const navigate= useNavigate();

  // setting all profiles to state (to update them).
  const [profileState, setProfileState]= useState(null);
  const [editForm, setEditForm]= useState({owner:`${user._id}`});

  // URL to fetch by ID
  const profileURL=  `https://foto-book.herokuapp.com/profile/${id}`;

  // Event handler to setNewForm state to inputs when inputs are changed.
  const handleChange= (e)=>{setEditForm({...editForm,[e.target.name]:e.target.value });};

  // Fetches all Profiles.
  const fetchProfile=async()=>{
    try{const res= await fetch(profileURL);
        const userProfJSON= await res.json();
        setProfileState(userProfJSON);
    }catch(err){console.log(err);}
  }

  // Function to update profile.
  const updateProfile= async(e)=>{
    e.preventDefault();
    try{const options ={method:"PUT",headers:{'Authorization':`Bearer ${getUserToken()}`,"Content-Type":"application/json"},body:JSON.stringify(editForm)}
        const res= await fetch(profileURL,options);
        const updatedProfile= await res.json();
        setProfileState(updatedProfile);
        setEditForm(updatedProfile);
        navigate(-1);
    }catch(err){console.log(err);}
  }

  // Fetch profile on page load
  useEffect(()=>{fetchProfile();},[])
  
  // Returns Update Profile Form.
  return(
      <form className='editProfileContainer' onSubmit={updateProfile}>
        <div className="editProfileDiv">
        <h3>Edit Profile</h3>
          <input type="text"
                value={editForm.usernameProfile}
                name="usernameProfile"
                placeholder="Username.."
                onChange={handleChange}/>
          <input type="text"
                value={editForm.imageProfile}
                name="imageProfile"
                placeholder="Profile img url.."
                onChange={handleChange}/>
          <input type="text"
                value={editForm.headerImageProfile}
                name="headerImageProfile"
                placeholder="Header img url.."
                onChange={handleChange}/>
          <input type="text"
                value={editForm.bioProfile}
                name="bioProfile"
                placeholder="Bio.."
                onChange={handleChange}/>
          <input className="editProfileBtn" type="submit" value="Update"/>
        </ div>
      </form>
  )
}

export default EditProfile