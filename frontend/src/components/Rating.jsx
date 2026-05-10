import React from 'react'
import { useId } from 'react'
import '../App.css';

const Rating = () => {
    /*generating unique ids to allow inputs/labels to 
    be associated without duplicate ids on page
    */
    const id = useId();

    const submitRating = async (event) => {
        event.preventDefault();
        
        const addRating = new FormData(event.currentTarget);
        console.log("User rating:" + addRating.get('rating'));
        /*send this rating to backend: update to numRatings++ and 
        compute new average rating*/
    }


    return (
    <form className = "rating-container" method = "POST" onSubmit = {submitRating}>
            
            <button type="submit" >Rate</button>

            <input type="radio" id = {`${id}-star5`} value = "5" name = "rating"/>
            <label htmlFor={`${id}-star5`} className = "star">
                <i className="fa-solid fa-star"></i>
            </label>

            <input type="radio" id = {`${id}-star4`} value = "4" name = "rating"/>
            <label htmlFor = {`${id}-star4`} className = "star">
                <i className="fa-solid fa-star"></i>
            </label>

            <input type="radio" id = {`${id}-star3`} value = "3" name = "rating"/>
            <label htmlFor = {`${id}-star3`} className = "star">
                <i className="fa-solid fa-star"></i>
            </label>

            <input type="radio" id = {`${id}-star2`} value = "2" name = "rating"/>
            <label htmlFor = {`${id}-star2`} className = "star">
                            <i className="fa-solid fa-star"></i>
            </label>

            <input type="radio" id = {`${id}-star1`} value = "1" name = "rating"/>
            <label htmlFor = {`${id}-star1`} className = "star">
                <i className="fa-solid fa-star"></i>
            </label>
    </form>
  )
}

export default Rating