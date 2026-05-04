import React from 'react'
import { useState } from 'react';


export const SignUp = () => {
  
  const crop = () => {

  }
  return (
    <main className = "form-page">
        <div className="form-box">
            <h1>Sign Up</h1>

            <input type="text" id="newUsername" placeholder="Username" required/>
            <input type="password" id="newPassword" placeholder="Password" required/>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required/>

            <fieldset>
              <legend><strong>Set Up Your Profile</strong></legend>
                <label htmlFor="uploadPfp">Profile Photo</label>
                <input 
                  id = "uploadPfp" 
                  type = "file" 
                  accept = "image/*"
                  style = {{display: "none"}}
                />
                <button>Upload Photo</button>
                
                <label htmlFor='bio-box'>Add a Bio:</label>
                <textarea id='bio-box' className = "comment-box"></textarea>

            </fieldset>

            <button id="signupButton">Create Account</button>
        </div>
    </main>
  )
}
