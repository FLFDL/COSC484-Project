import React from 'react'
import { useState } from 'react';
import UploadPhoto from './UploadPhoto';

export default function EditProfile({ username, bio, onSave, onClose }) {

    const [newUsername, setNewUsername] = useState(username);
    const [newPassword, setNewPassword] = useState("");
    const [newBio, setNewBio] = useState(bio);
    const [newPfp, setNewPfp] = useState(null)

    const handleCroppedImg = (photo) => {
        setNewPfp(photo);
    }

    const handleSubmit = () => {
        onSave({
            username: newUsername,
            bio: newBio,
            profilePic: newPfp,
            ...(newPassword && { password: newPassword })
        });
        onClose();
    }

    return (
        <form className="editProfile" onSubmit={(e) => { 
            e.preventDefault();
            handleSubmit();
        }}>

            <h2>Edit Profile</h2>

            <label>Username</label>
            <input
                type="text"
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
            />

            <label>Password</label>
            <input
                type = "text"
                placeholder = "Enter new password"
                value = {newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Bio</label>
            <textarea
                placeholder="Enter new bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
            />

            <UploadPhoto getCroppedImg={handleCroppedImg} />

            <div className="modal-actions">
                <button type="submit">
                    Save
                </button>
                <button type="button"
                    onClick={onClose}>
                    Cancel
                </button>
            </div>
            
        </form>
    )
}
