import React from 'react'
import { useState, useEffect } from 'react'
import EditProfile from '../components/EditProfile'
import AddPost from '../components/AddPost'
import Post from '../components/Post'


export const Profile = () => {


  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null)
  const [posts, setPosts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);



  const handleSaveProfile = async ({ username, password, bio, profilePic }) => {
    let profilePicUrl = null;

    if (profilePic) {
      const formData = new FormData();
      formData.append('image', profilePic);

      const uploadResponse = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const uploadData = await uploadResponse.json();
      profilePicUrl = uploadData.imageUrl;
    }

    const response = await fetch(`/api/users/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({
        username,
        bio,
        ...(password && { password }),
        ...(profilePicUrl && { profilePic: profilePicUrl })
      })
    });

    const data = await response.json();
    setBio(data.bio);
    setUsername(data.username);
    if (data.profilePic) setProfilePic(data.profilePic);

  }

  useEffect(() => {

    const fetchUser = async () => {
      const response = await fetch(`/api/auth/me`, { credentials: 'include' });
      if (!response.ok) {
        //window.location.href = "/login";
        return;
      }
      const data = await response.json();
      setUsername(data.username);
      setBio(data.bio || "");
      setProfilePic(data.profilePic);

      const postResponse = await fetch(`/api/users/${data.username}`, { credentials: 'include' });
      const postData = await postResponse.json();
      setPosts(postData.posts);
    }

    fetchUser();

  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  }

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
          <button
            id = "editProfile-btn"
            onClick={() => setShowEditModal(true)}>
              
            Edit Profile
          </button>
        </div>
      </div>

      <div id="profilePosts">

        <div
          className="addPostTile"

          onClick={() => {
            console.log("clicked add post tile");
            setShowModal(true)
          }
          }
        >
          + Add Post
        </div>

        {posts?.map((post) => (
          <Post
            key={post._id || post.id}
            postData={post}
            currUser={username}
            onDelete={handleDeletePost}
          />
        ))}

      </div>

      {/* add post modal */}
      {showModal && (

        <div
          id="postModal"
          className="modal"
        >
          <div className="modal-content">
            <AddPost
              username={username}
              onAddPost={handleAddPost}
              onClose={() => setShowModal(false)}
            />

          </div>
        </div>

      )}

      {/* edit profile modal */}
      {showEditModal && (

        <div className="modal"

        >
          <div className="modal-content">
            <EditProfile
              username={username}
              bio={bio}
              onSave={handleSaveProfile}
              onClose={() => setShowEditModal(false)}
            />

          </div>

        </div>
      )}

    </main>
  );
};

export default Profile;
