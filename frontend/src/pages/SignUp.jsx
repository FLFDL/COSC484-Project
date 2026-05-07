import React from 'react'
import { Link } from 'react-router-dom';

export const SignUp = () => {
  return (
    <main className="form-page">
      <div className="form-box">
        <h1>Sign Up</h1>

        <p>Have an account already? Log in {""}
          <Link to="/login">here</Link>
        </p>
        <input type="text" id="newUsername" placeholder="Username" required />
        <input type="password" id="newPassword" placeholder="Password" required />
        <input type="password" id="confirmPassword" placeholder="Confirm Password" required />

        <button id="signupButton">Create Account</button>
      </div>
    </main>
  )
}
