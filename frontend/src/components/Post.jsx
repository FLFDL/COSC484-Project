import React, {useState, useRef} from 'react'
import { NavLink, Link } from 'react-router-dom'
import image from '../assets/test-post.jpg';
import Rating from './Rating';
import Comment from './Comment';


const Post = ({postData, currUser}) => {
  
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
    <div className='post' id = {postData.id}>
        <section className="post-header">
            <div className = "user-info">
                <img src = {image} className = "profilePic" />
                <Link to = "/public-profile" className = "username">{postData.author}</Link>
            </div>
            <p className = "light-gray">
                    <span className = "avg-rating bold" title = "Average Rating">{postData.avgRating}</span>
                    <span className = "num-ratings" title = "Total Ratings"> ({postData.totalRatings})</span>
                    <i className="fa-solid fa-star"></i>
            </p>
        </section>
        <section className="post-content">
            <img className = "post-image" src = {image}></img>
            <p className="post-description">{postData.description}</p>

            <Rating/>

            <section className="post-footer">
                <p className = "light-gray post-date">Posted: {postData.datePosted}</p>
                <button className = "open-comments-btn" onClick={toggleComments}></button>
                {/*if user not logged in, make btn route user to login */}
            </section>

            <section ref = {commentSectionRef} className="collapsible-comments hidden">
                <form method="POST" className = "comment" onSubmit = {(e) => postComment(e, postData.id, currUser)}>
                    <label>
                        <Link className = "username" to="/public-profile">{currUser}</Link>:
                        <textarea className = "comment-box" name = "comment-text" placeholder = "Leave a comment..."></textarea>
                    </label>
                    <button className = "post-comment-btn" type = "submit">Post</button>
                </form>
                {postData.comments?.map((comment) => (
                    <Comment key = {comment.id} username = {comment.username} text = {comment.text}/>
                ))}
            </section>
        </section>




    </div>
  )
}

export default Post