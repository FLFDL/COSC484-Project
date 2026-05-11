import React, {useState, useRef} from 'react'
import { NavLink, Link } from 'react-router-dom'
import Rating from './Rating';
import Comment from './Comment';


const Post = ({postData, currUser}) => {
    console.log(postData);
    const commentSectionRef = useRef(null);
    
    //need to check user session
    const isLoggedIn = true;

    const toggleComments = () => {
        const section = commentSectionRef.current;

        if (section && isLoggedIn) {
            console.log("you are logged in!");
            section.classList.toggle('hidden');
        }
        else {
            console.log("try logging in to see and post comments!");
        }
    }
    
    const postComment = async (event, postId, currUser) => {
        event.preventDefault();
        const addComment = new FormData(event.currentTarget);

        //adding parent post + commenters username to form data
        addComment.set('commenter', currUser);
        addComment.set('post-id', postId);
        //logging comment data
        const data = Object.fromEntries(addComment);
        console.log(data);
        /*send this rating to backend: update to numRatings++ and 
        compute new average rating*/
    }

    return (
    <div className='post' id = {postData._id}>
        <section className="post-header">
            <div className = "user-info">
                <img src = {postData.author.profilePic || null} className = "profilePic" />
                <Link to = {`/profile/${postData.author.username}`} className = "username">{postData.author.username}</Link>
            </div>
            <p className = "light-gray">
                    <span className = "avg-rating bold" title = "Average Rating">{postData.avgRating}</span>
                    <span className = "num-ratings" title = "Total Ratings"> ({postData.ratings.length})</span>
                    <i className="fa-solid fa-star"></i>
            </p>
        </section>
        <section className="post-content">
            <img src = {postData.imageUrl} className = "post-image" ></img>
            <p className="post-description">{postData.caption}</p>

            <Rating/>

            <section className="post-footer">
                <p className = "light-gray post-date">Posted: {postData.createdAt}</p>
                <button className = "open-comments-btn" onClick={toggleComments}></button>
                {/*if user not logged in, make btn route user to login */}
            </section>

            <section ref = {commentSectionRef} className="collapsible-comments hidden">
                <form method="POST" className = "comment" onSubmit = {(e) => postComment(e, postData._id, currUser)}>
                    <label>
                        <Link className = "username" to="/public-profile">{currUser}</Link>:
                        <textarea className = "comment-box" name = "comment-text" placeholder = "Leave a comment..."></textarea>
                    </label>
                    <button className = "post-comment-btn" type = "submit">Post</button>
                </form>
                {postData.comments?.map((comment) => (
                    <Comment key = {comment._id} username = {comment.author.username} text = {comment.text}/>
                ))}
            </section>
        </section>




    </div>
  )
}

export default Post