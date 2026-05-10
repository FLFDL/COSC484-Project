import React from 'react'
import { useState, useEffect } from 'react'
import UploadPhoto from '../components/UploadPhoto'
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

  const handleSaveProfile = async ({ username, bio, profilePic }) => {
    if (username) {
      setUsername(username);
      localStorage.setItem("loggedInUser", username);
    }
    if (bio) {
      setBio(bio);
      localStorage.setItem("loggedInUserBio", bio);
    }
    if (profilePic) {
      setProfilePic(profilePic);
      localStorage.setItem("loggedInUserPic", profilePic);
    }

  }

  const getCroppedImg = (photo) => {
    const reader = new FileReader();
    reader.onload = () => {
        setProfilePic(reader.result);
        localStorage.setItem("loggedInUserPic", reader.result);
    }
    reader.readAsDataURL(photo);
  }
  useEffect(() => {

    const storedUsername = localStorage.getItem("loggedInUser");
    const storedBio = localStorage.getItem("loggedInUserBio");
    const storedPic = localStorage.getItem("loggedInUserPic");


    if (storedUsername) {
      setUsername(storedUsername);

      if (storedBio) {
        setBio(storedBio);
      }

      if (storedPic) {
        setProfilePic(storedPic);
      }
      /* un comment this lol
      } else {
        window.location.href = "/login";
        */
    }

  }, []);

  /* add new post */
  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
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

        {posts.map((post) => (
          <Post
            key={post._id || post.id}
            postData={post}
            currentUser={username}
          />
        ))}

      </div>


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

            <button onClick={() => setShowModal(false)}>
              Cancel
            </button>


          </div>
        </div>

      )}

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