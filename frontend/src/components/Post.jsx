import React, { useState, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Rating from './Rating';
import Comment from './Comment';


const Post = ({ postData, currUser, onDelete }) => {
    console.log(postData);
    const commentSectionRef = useRef(null);
    const navigate = useNavigate();
    const [comments, setComments] = useState(postData.comments || []);
    const [commentText, setCommentText] = useState('');
    const [avgRating, setAvgRating] = useState(postData.avgRating || 0);
    const [numRatings, setNumRatings] = useState(postData.ratings ? postData.ratings.length : 0);

    //need to check user session
    const isLoggedIn = !!currUser;

    const toggleComments = () => {
        const section = commentSectionRef.current;

        if (section && isLoggedIn) {
            console.log("you are logged in!");
            section.classList.toggle('hidden');
        }
        else {
            navigate('/login');
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/posts/${postData._id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!response.ok) throw new Error("Failed to delete post");
            onDelete(postData._id);
        } catch (err) {
            console.error(err);
        }
    }

    const postComment = async (event, postId, currUser) => {
        event.preventDefault();
        const uploadComment = await fetch(`/api/posts/${postData._id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ text: commentText })
        })
        const comment = await uploadComment.json();
        if (!uploadComment.ok) throw new Error(comment.error)

        setComments(old => [...old, comment])
        setCommentText('');

        /*send this rating to backend: update to numRatings++ and 
        compute new average rating*/
    }


    return (
        <div className='post' id={postData._id}>
            <section className="post-header">
                <div className="user-info">
                    <img src={postData.author.profilePic || null} className="post-pfp" />
                    <Link to={`/profile/${postData.author.username}`} className="username">{postData.author.username}</Link>
                </div>
                <p className="light-gray">
                    <span className="avg-rating bold" title="Average Rating">{postData.avgRating}</span>
                    <span className="num-ratings" title="Total Ratings"> ({postData.ratings.length})</span>
                    <i className="fa-solid fa-star"></i>
                </p>
            </section>
            <section className="post-content">
                <img src={postData.imageUrl} className="post-image" ></img>
                <h2>{postData.petName}</h2>
                <p className="post-description">{postData.caption}</p>

                <Rating postId = {postData._id}/>

                <section className="post-footer">
                    <p className="light-gray post-date">Posted: {postData.createdAt}</p>
                    <button className="open-comments-btn" onClick={toggleComments}></button>
                    {/*if user not logged in, make btn route user to login */}

                </section>


                <section ref={commentSectionRef} className="collapsible-comments hidden">
                    <form method="POST" className="comment" onSubmit={(e) => postComment(e, postData._id, currUser)}>
                        <label>
                            <Link className="username" to={`/profile/${currUser}`}>{currUser}</Link>:
                            <textarea className="comment-box" name="comment-text" placeholder="Leave a comment..."
                                value={commentText}
                                onChange={(text) => setCommentText(text.target.value)}></textarea>
                        </label>
                        <button className="post-comment-btn" type="submit">Post</button>
                    </form>
                    {comments?.map((comment) => (
                        <Comment key={comment._id} username={comment.author.username} text={comment.text} />
                    ))}
                </section>
            </section>

            {currUser === postData.author.username && (
                <button className = "delete-btn" onClick={handleDelete}>Delete</button>
            )}




        </div>
    )
}

export default Post
