import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const navigate = useNavigate();
  const login = async (event) => {
    //prevent refresh on submission
    event.preventDefault();

    /*connect to backend to login user if account exists */

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          identifier: formData.get('usernameInput'),
          password: formData.get('passwordInput')
        })
      });
      const data = await res.json();
      console.log(data);
      if(!res.ok) {
        throw new Error(data.error);
      }

      //navigate to profile page afterward
      navigate('/profile');

    } catch (err) {
      console.error(err);
      alert(err.message);
    }

  }


  return (
    <main className="form-page">
        <form className="form-box" method="POST" onSubmit={login}>
          <h1>Login</h1>

          <p>Don't an account? Make one {""}
            <Link to="/sign-up">here</Link>
          </p>
          <input type="text" name="usernameInput" placeholder="Username or Email" required />
          <input type="password" name="passwordInput" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>
      </main>
      )
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
