import React from 'react'
import { useState } from 'react';
import UploadPhoto from '../components/UploadPhoto';
import {useNavigate} from 'react-router-dom';


export const SignUp = () => {
  const navigate = useNavigate();

  const [croppedImg, setCroppedImg] = useState(null);



  const createAccount = async (event) => {
      event.preventDefault(); //prevent page refresh
            
      const newAccount = new FormData(event.currentTarget);
      
      //logging to see if formdata is working
      

      // Check password match
      if (newAccount.get('newPassword') !== newAccount.get('confirmPassword')) {
            alert("Passwords do not match!");
              return;
      }

      //initialize bio if empty
      if (newAccount.get('newBio') == ''){
          newAccount.set('newBio', 'No bio provided');
      }
      //console.log(newAccount.get('newBio'));
      
      //set pfp to cropped version if cropped
      if (croppedImg != null) {
        newAccount.set('pfp', croppedImg, `${newAccount.get('newUsername')}.jpg`);
      }


      

      console.log("sending data for account creation");
      /*SEND FORM DATA TO BACKEND HERE -- newAccount contains form 
        data for account registration 
        
        also need to send pfp file to cloudinary but not sure how thats done
        
      */
        const data = Object.fromEntries(newAccount);
        console.log(data);
        //navigate to profile page afterward
        navigate('/profile');
        
  }


  return (
    <main className = "form-page">
        <form className="form-box" method = "POST" onSubmit = {createAccount}>
            <h1>Sign Up</h1>

            <input type="text" name="newUsername" placeholder="Username" required/>
            <input type="password" name="newPassword" placeholder="Password" required/>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required/>

            <fieldset>
              <legend><strong>Set Up Your Profile</strong></legend>
                
                <UploadPhoto getCroppedImg={(img) => setCroppedImg(img)}/>
                <label htmlFor='bio-box'>Add a Bio:</label>
                <textarea id='bio-box' className = "comment-box" name = "newBio"></textarea>

            </fieldset>

            <button type = "submit">Create Account</button>
        </form>
    </main>
  )
}
