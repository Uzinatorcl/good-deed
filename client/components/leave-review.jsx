import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
class LeaveReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      summary: ''
    };
    this.trackSummary = this.trackSummary.bind(this);
  }
  onStarClick(nextValue, prevValue, name) {
    console.log(this.state.rating);
    this.setState({ rating: nextValue });
  }
  trackSummary(event) {
    this.setState({ summary: event.target.value });
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
          <button>SUBMIT</button>
        </div>
      </div>
    );
  }

}

export default LeaveReview;
