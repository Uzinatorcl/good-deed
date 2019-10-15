import React from 'react';
import Header from './header';
import Review from './reviews';
import DashFooter from './dash-footer';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'commit',
      userReviews: []
    };
  }
  componentDidMount() {
    fetch(`api/get-review.php?id=${this.props.userData.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ userReviews: data });
      })
      .catch(error => console.error(error));
  }
  displayReviews() {
    if (this.state.userReviews.length === 0) {
      return 'No reviews';
    }
    return this.state.userReviews.map(data => {
      return <Review key={data.review_id} id={data.review_id} username={data.username} category={data.category_name} rating={data.rating} image={data.image_url} />;
    });
  }
  getReviewStars() {
    const totalReviews = this.state.userReviews.length;
    let reviewAverage = 0;
    this.state.userReviews.map(object => {
      reviewAverage += parseInt(object.rating);
    });
    reviewAverage = Math.floor(reviewAverage / totalReviews);
    if (isNaN(reviewAverage)) {
      return 0;
    }
    return reviewAverage;
  }
  render() {
    const reviewStars = this.getReviewStars();
    const totalReviews = this.state.userReviews.length;
    const reviewsToDisplay = this.displayReviews();
    console.log(this.props.userData);
    console.log(reviewStars);
    return (
      <div className="container">
        <Header/>
        <div className="userProfile">
          <div className="row mx-auto align-items-center justify-content-center">
            <div className="col-9 userInfo">
              <div className="userName">{this.props.userData.username}</div>
              <div className="totalReviews"><span>{totalReviews}</span> Reviews</div>
              <div className="currentRating">
                <img src={`images/ratings/${reviewStars}.png`} alt="your rating"/>
              </div>
            </div>
            <div className="col-3">
              <img className="userImage"src={this.props.userData.image_url} alt="your profile image"/>
            </div>
          </div>
        </div>
        <div className="recentReviews">
          <div className="heading">
          YOUR RECENT REVIEWS
          </div>
          <div className="reviewsContainer mx-auto">
            {reviewsToDisplay}
          </div>
        </div>
        <DashFooter/>
      </div>
    );
  }
}

export default Dashboard;
