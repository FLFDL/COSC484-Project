import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { useRef } from 'react';

export const Home = () => {
  const [currUser, setUser] = useState(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const [sortBy, setSortBy] = useState('recent');

  
useEffect(() => {
const checkUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {credentials:'include'});
      if (!response.ok) {
        setUser(null)
        return;
      }
      const data = await response.json();
      setUser(data.username);
    }
    checkUser();
  },[]);
  const [posts, setPosts] = useState([]);
  
   useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?sort=${sortBy}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [sortBy]);

return (
  <main className="home-page">

    <div className="container">
      {posts.map((post) => (
        <Post key={post._id} postData={post} currUser={currUser} />
      ))}
    </div>

    <aside>
      <div className="filters">
        <label htmlFor="content-filters">Sort by: </label>
        <select id="content-filters"
        value = {sortBy}
        onChange = {(e) => setSortBy(e.target.value)}>
          <option value="recent">Recent</option>
          {/*<option value="unpopular">Least Rated</option>*/}
          <option value="top-rated">Top Rated</option>
          {/*<option value="recent">Latest</option>*/}
          <option value="oldest">Oldest</option>
        </select>
        <button id="back-to-top-btn" onClick={scrollToTop} >Back to Top</button>
      </div>
    </aside>
  </main>
)
}
