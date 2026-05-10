import React from 'react'
import { useState } from 'react';
import pet1 from '../assets/pet1.png'
import UploadPhoto from './UploadPhoto';

export default function AddPost({ username, onAddPost, onClose }) {

    const [caption, setCaption] = useState("");
    const [petName, setPetName] = useState("");
    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [preview, setPreview] = useState(null);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch('http://localhost:5001/api/upload', {
            method: "POST",
            body: formData,
            credentials: "include"
        })
        
        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return {
            imageUrl: data.imageUrl,
            publicId: data.publicId
        };
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!caption.trim()) {
            setError('Please enter a caption');
            return;
        }
        if (!petName.trim()) {
            setError('Please enter the name of your pet');
            return;
        }
        if (!image) {
            setError('Please upload an image of your pet');
            return;
        }
        setLoading(true);
        setError("");


        try {

            const { imageUrl, publicId } = await uploadImage();

            const postData = {
                caption,
                petName,
                imageUrl,
                publicId,
            }

            const response = await fetch('http://localhost:5001/api/posts',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(postData)
                })

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const savedPost = await response.json();
            console.log(savedPost);

            onAddPost(savedPost);
            setCaption("");
            setPetName("");
            setImage(null);
            onClose();

        } catch (error) {
            console.error(error);
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }

    }


    return (
        <form className="addPost" onSubmit={handleSubmit}>

            <h2>Create Post</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Pet name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
            />

            <textarea
                placeholder="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
            />

            <div className="image-upload">
                <label htmlFor="imageUpload">Upload Image</label>
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                />
            </div>
            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    style={{ maxWidth: "100%", marginTop: "0.5rem" }}
                />
            )}

            <div className="modal-actions">
                <button type="submit" disabled={loading}>
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </form>
    )
}
