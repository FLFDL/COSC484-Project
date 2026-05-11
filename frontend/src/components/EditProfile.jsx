import React from 'react'
import { useState } from 'react';
import UploadPhoto from './UploadPhoto';

export default function EditProfile({ username, bio, onSave, onClose }) {

    const [newBio, setNewBio] = useState(bio);
    const [newPfp, setNewPfp] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCroppedImg = (photo) => {
        setNewPfp(photo);
    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', newPfp);

        const response = await fetch('http://localhost:5001/api/upload', {
            method: "POST",
            body: formData,
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.imageUrl;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            let profilePicUrl = null;
            if (newPfp) {
                profilePicUrl = await uploadImage();
            }

            const response = await fetch('http://localhost:5001/api/users/profile',
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        bio: newBio,
                        ...(profilePicUrl && { profilePic: profilePicUrl })
                    })
                });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const savedProfile = await response.json();
            console.log(savedProfile);

            onSave(savedProfile);
            onClose();
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <form className="editProfile" onSubmit={handleSubmit}>

            <h2>Edit Profile</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <label>Bio</label>
            <textarea
                placeholder="Enter new bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
            />

            <UploadPhoto getCroppedImg={handleCroppedImg} />

            <div className="modal-actions">
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
                <button type="button"
                    onClick={onClose}>
                    Cancel
                </button>
            </div>

        </form>
    )
}
