import React from 'react'

export const Login = () => {
  return (
    <main className = "form-page">
        <div className="form-box">
            <h1>Login</h1>

            <input type="text" id="usernameInput" placeholder="Username" required/>
            <input type="password" id="passwordInput" placeholder="Password" required/>

            <button id="loginButton">Login</button>
        </div>
    </main>
  )
}
