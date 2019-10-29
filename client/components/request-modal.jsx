import React from 'react';

function RequestModal(props) {
  return (
    <div className="reviewModalContainer">
      <div className="reviewModalBackground" />
      <div className="review-modal">
        <div onClick={props.hide} className="fas fa-times closeReviewModal" />
        <div className="reviewModalUsername">{props.headline}</div>
        <div className="reviewModalSummary">
          {props.summary}
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
