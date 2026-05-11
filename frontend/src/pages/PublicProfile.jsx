import React from 'react'
import { useState, useEffect } from 'react'
import Post from '../components/Post'
import { useParams } from 'react-router-dom';

export const PublicProfile = () => {
  const {username: routeUsername} = useParams();
  
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null)
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchUser = async () => {
      const postResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${routeUsername}`, { credentials: 'include' });
      const postData = await postResponse.json();
      setUsername(postData.user.username);
      setBio(postData.user.bio || "");
      setProfilePic(postData.user.profilePic);
      setPosts(postData.posts || []);
    };
  
      fetchUser();
  
    }, [routeUsername]);


  return (
    <main>
      <div className="profileHeader">
        <img
          src={profilePic || "exampleProfilePosts/profilePicExample.jpg"}
          alt="profile pic"
          id="profilePic"
        />

        <div className="profileBio">
          <h1 id="username">{username}</h1>
          <p id="bio">
            {bio || "Example bio for a profile"}
          </p>
        </div>
      </div>

      <div id="profilePosts">
        {posts?.map((post) => (
          <Post
            key={post._id || post.id}
            postData={post}
            currUser={username}
          />
        ))}

      </div>
    </main>
  )
}

export default PublicProfile