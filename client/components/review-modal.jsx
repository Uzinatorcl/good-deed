import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class ReviewModal extends React.Component {

  render() {
    const { image_url, username, category_name, rating, review_message } = this.props.review;
    return (
      <div className={'reviewModalContainer'}>
        <div className="reviewModalBackground"/>
        <div className="review-modal">
          <div onClick ={this.props.hide}className="fas fa-times closeReviewModal"/>
          <div className="reviewModalUserImage" style={{ backgroundImage: `url(${image_url})` }}/>
          <div className="reviewModalUsername">{username}</div>
          <div className="reviewModalCategory">{category_name}</div>
          <div className="reviewModalRating">
            <StarRatingComponent name="rating" editing={false} value={parseInt(rating)} />
          </div>
          <div className="reviewModalSummary">
            {review_message}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewModal;
