import React from 'react';

function Review(props) {
  return (
    <div className="userProfile">
      <div className="row mx-auto align-items-center justify-content-center">
        <div className="col-9 userInfo">
          <div className="userName">{props.username}</div>
          <div className="totalReviews">{props.category}</div>
          <div className="currentRating">
            <img src={`images/ratings/${props.rating}.png`} alt="reviewers rating" />
          </div>
        </div>
        <div className="col-3">
          <img className="userImage" src={props.image} alt="your profile image" />
        </div>
      </div>
    </div>
  );
}
export default Review;
