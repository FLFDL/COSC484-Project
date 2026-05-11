import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/auth/me`,
      {
        credentials: "include"
      }
    )
      .then(response => setIsLoggedIn(response.ok))
      .catch(() => setIsLoggedIn(false))
  }, []);

  const handleLogout = async () => {
    await fetch(`1/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <NavLink to="/" id="petstagram-logo">Petstagram</NavLink>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/community-guidelines">Community Guidelines</NavLink></li>
        {isLoggedIn ? (
          <>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><a
              onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out</a></li>
          </>
        ) : (
          <>
            <li><NavLink to="/sign-up">Sign up</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
