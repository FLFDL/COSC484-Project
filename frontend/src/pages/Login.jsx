import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const navigate = useNavigate();
  const login = async (event) => {
    //prevent refresh on submission
    event.preventDefault();

    /*connect to backend to login user if account exists */

    //navigate to profile page afterward
    navigate('/profile');
  }


  return (
    <main className="form-page">
        <form className="form-box" method="POST" onSubmit={login}>
          <h1>Login</h1>

          <p>Don't an account? Make one {""}
            <Link to="/sign-up">here</Link>
          </p>
          <input type="text" name="usernameInput" placeholder="Username" required />
          <input type="password" name="passwordInput" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>
      </main>
      )
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
