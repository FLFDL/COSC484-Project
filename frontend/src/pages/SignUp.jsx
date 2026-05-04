import React from 'react'

export const SignUp = () => {
  return (
    <main className = "form-page">
        <div className="form-box">
            <h1>Sign Up</h1>

            <input type="text" id="newUsername" placeholder="Username" required/>
            <input type="password" id="newPassword" placeholder="Password" required/>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required/>

            <button id="signupButton">Create Account</button>
        </div>
    </main>
  )
}
