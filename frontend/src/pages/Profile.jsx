import React from 'react'
import { useState, useEffect } from 'react'
import UploadPhoto from '../components/UploadPhoto'
import AddPost from '../components/AddPost'
import Post from '../components/Post'


export const Profile = () => {


  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null)
  const [posts, setPosts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const getCroppedImg = (photo) => {
    const imageUrl = URL.createObjectURL(photo);
    setProfilePic(imageUrl);
    localStorage.setItem("loggedInUserPic", imageUrl);
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
          <UploadPhoto getCroppedImg={getCroppedImg} />
        </div>
      </div>

      <div id="profilePosts">

        <div
          className="addPostTile"
          
          onClick={() => {
            console.log("clicked add post tile");
            setShowModal(true)}
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
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
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

    </main>
  );
};

export default Profile;