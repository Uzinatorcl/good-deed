import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

function Review(props) {
  return (
    <div onClick={() => props.setReview(props.id)} className="reviewersProfileContainer">
      <div className="reviewersProfile">
        <div className="reviewerInfo">
          <div className="reviewerUsername">{props.username}</div>
          <div className="categoryName">{props.category}</div>
          <div className="currentRating">
            <StarRatingComponent name="rating" editing={false} value={parseInt(props.rating)} />
          </div>
        </div>
        <div className="reviewProfileImageContainer">
          <img className="reviewerImage" src={props.image} alt="your profile image" />
        </div>
      </div>
    </div>
  );
}
export default Review;
