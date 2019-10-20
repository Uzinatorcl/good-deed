import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { throws } from 'assert';
class LeaveReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      summary: ''
    };
    this.trackSummary = this.trackSummary.bind(this);
    this.sendReview = this.sendReview.bind(this);
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  trackSummary(event) {
    this.setState({ summary: event.target.value });
  }
  sendReview() {
    const review = {
      'commit_id': this.props.commitId,
      'request_id': this.props.requestId,
      'recieving_user_id': this.props.recievingUserId,
      'sending_user_id': this.props.sendingUserId,
      'review_message': this.state.summary,
      'rating': this.state.rating
    };
    this.props.submitReview(review);
  }
  render() {
    const { rating, summary } = this.state;
    return (
      <div className="requestContainer">
        <div className="heading" style={{ 'color': 'white' }}>LEAVE A REVIEW</div>
        <div className="requestFormContainer">
          <form className="requestForm">
            <div className="ratingContainer">
              <StarRatingComponent name="rating" value={rating} onStarClick={this.onStarClick.bind(this)} />
            </div>
            <label className="summaryLabel" style={{ 'color': 'white' }}>REVIEW SUMMARY</label>
            <textarea id="summary" className="requestBoxSummary" cols="30" rows="8" onChange={this.trackSummary} value={summary}></textarea>
          </form>
        </div>
        <div className="reviewButtonContainer">
          <button onClick={this.sendReview}>SUBMIT</button>
        </div>
      </div>
    );
  }

}

export default LeaveReview;
