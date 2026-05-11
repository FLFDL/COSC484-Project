import React, {useState, useRef} from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Rating from './Rating';
import Comment from './Comment';


const Post = ({postData, currUser}) => {
    console.log(postData);
    const commentSectionRef = useRef(null);
    const navigate = useNavigate();
    const [comments, setComments] = useState(postData.comments || []);
    const [commentText, setCommentText] = useState('');
    
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
    
    const postComment = async (event, postId, currUser) => {
        event.preventDefault();

        
        const data = Object.fromEntries(addComment);
        const uploadComment = await fetch(`http://localhost:5001/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ text: commentText })
        })
        const comment = await uploadComment.json();
        if (!uploadComment.ok) throw new error(data.error)

        setComments(old => [...old,comment ])
        setCommentText('');
        
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
                        <textarea className = "comment-box" name = "comment-text" placeholder = "Leave a comment..."
                        value = {commentText}
                        onChange = {(text) => setCommentText(text.target.value)}></textarea>
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