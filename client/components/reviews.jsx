import React from 'react';

function Review(props) {
  return (
    <div className="reviewersProfile">
      <div className="row mx-auto align-items-center justify-content-center">
        <div className="col-9 reviewerInfo">
          <div className="reviewerUsername">{props.username}</div>
          <div className="categoryName">{props.category}</div>
          <div className="currentRating">
            <img className="ratingImage" src={`images/ratings/${props.rating}.png`} alt="reviewers rating" />
          </div>
        </div>
        <div className="col-3">
          <img className="reviewerImage" src={props.image} alt="your profile image" />
        </div>
      </div>
    </div>
  );
}
export default Review;
