import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { useRef } from 'react';

const testPost = {
  "id": 1,

  "author": "John poster",
  "pfpURL": "../assets/test-post.jpg",
  "avgRating": 3.5,
  "totalRatings": 40,

  "imgURL": "../assets/test-post.jpg",
  "description": "behold, kitty.",
  "datePosted": "12-12-2012",
  "Comments": [
    {
      "id": 13242,
      "username": "RockEater900",
      "text": "I eat rocks"
    },

    {
      "id": 233,
      "username": "frog",
      "text": "kitty meowww omg meowww kitty woawwwwwww kitty"
    },

    {
      "id": 33434,
      "username": "meeps",
      "text": "asdasdass asdasdsa asdasd ads ads asd asd asd asd ads"
    }
  ]

};

const testPost2 = {
  "id": 2,

  "author": "Joe Biden",
  "pfpURL": "../assets/test-post.jpg",
  "avgRating": 1.0,
  "totalRatings": 400,

  "imgURL": "../assets/test-post.jpg",
  "description": "kitty",
  "datePosted": "10-12-2012",
  "comments": [
    {
      "id": 348,
      "username": "RockEater900",
      "text": "hello"
    },

    {
      "id": 3443,
      "username": "frog",
      "text": "hello"
    },

    {
      "id": 123,
      "username": "meeps",
      "text": "asdasdass asdasdsa asdasd ads ads asd asd asd asd ads"
    }
  ]

};
const posts = [testPost2, testPost2];
const currUser = "bob";
//need to get posts and current user logged in from backend to display on home page

export const Home = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const [posts, setPosts] = useState([]);
  
   useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:5001/api/posts', {
        credentials: 'include'
      });
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

return (
  <main className="home-page">

    <div className="container">
      {posts.map((post) => (
        <Post key={post.id} postData={post} currUser={currUser} />
      ))}
    </div>

    <aside>
      <div className="filters">
        <label htmlFor="content-filters">Sort by: </label>
        <select id="content-filters">
          <option value="select">Select</option>
          <option value="select">Most Rated</option>
          <option value="select">Latest</option>
          <option value="select">Oldest</option>
        </select>
        <button id="back-to-top-btn" onClick={scrollToTop} >Back to Top</button>
      </div>
    </aside>
  </main>
)
}
