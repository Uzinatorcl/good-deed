import React from 'react';
import Header from './header';
import Footer from './footer';
import CheckRequests from './check-requests';
import CheckCommits from './check-commits';
import Deed from './deed';
import CompleteRequestUser from './check-complete-request';
import LeaveReview from './leave-review';
import Alert, { openAlert } from 'simple-react-alert';
import { confirmAlert } from 'react-confirm-alert';

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'requests',
      userRequests: null,
      userCommits: null,
      commitToDisplay: null,
      usersWhoCommitedToYourRequest: null,
      userToSendReview: null
    };
    this.setCheckDisplay = this.setCheckDisplay.bind(this);
    this.setDeed = this.setDeed.bind(this);
    this.cancelACommitToADeed = this.cancelACommitToADeed.bind(this);
    this.cancelADeedRequest = this.cancelADeedRequest.bind(this);
    this.setUserDataForRequest = this.setUserDataForRequest.bind(this);
    this.userReviewData = this.userReviewData.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  setCheckDisplay(newView) {
    this.setState({ view: newView });
  }
  cancelACommitToADeed(id) {
    fetch('api/cancel_commit.php', {
      'method': 'POST',
      'body': JSON.stringify(
        {
          'commit_id': id
        })
    })
      .then(response => response.ok ? response : Promise.reject(new Error('There was in issue canceling this commit.')))
      .then(() => {
        openAlert({ message: 'You have successfully canceled this commit.', type: 'success' });
      })
      .then(() => {
        const updatedCommitList = this.state.userCommits.filter(commit => commit.commit_id !== id);
        this.setState({ userCommits: updatedCommitList });
      })
      .then(() => {
        this.setCheckDisplay('commits');
      })
      .catch(error => {
        console.error(error);
        openAlert({ message: 'There was an issue canceling your commit.', type: 'danger' });
      });
  }
  cancelADeedRequest(id) {
    confirmAlert({
      title: 'Delete this request?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch('api/cancel_request.php', {
              'method': 'POST',
              'body': JSON.stringify(
                {
                  'request_id': id
                })
            })
              .then(response => response.ok ? response : Promise.reject(new Error('There was in issue canceling your request.')))
              .then(() => {
                openAlert({ message: 'You have successfully canceled your request.', type: 'success' });
              })
              .then(() => {
                const updatedRequestList = this.state.userRequests.filter(request => request.request_id !== id);
                this.setState({ userRequests: updatedRequestList });
              })
              .catch(error => {
                console.error(error);
                openAlert({ message: 'There was an issue canceling your request.', type: 'danger' });
              });

          }
        },
        {
          label: 'No'
        }
      ]
    });
  }
  selectedButton(view) {
    if (view === 'requests') return ['selected', ''];
    if (view === 'commits') return ['', 'selected'];
    return ['', ''];
  }
  setDeed(id) {
    const deedToSet = this.state.userCommits.find(commit => commit.commit_id === id);
    this.setState({ commitToDisplay: deedToSet });
  }
  setUserDataForRequest(id) {
    fetch(`api/user_who_commited.php?request_id=${id}`)
      .then(response => response.ok ? response.json() : Promise.reject(new Error('There was an issue retrieving your commiters.')))
      .then(data => {
        this.setState({ usersWhoCommitedToYourRequest: data });
      })
      .then(() => {
        if (!this.state.usersWhoCommitedToYourRequest.length) {
          openAlert({ message: 'There are no users who have commited to your request at this time.', type: 'info' });
        } else {
          this.setCheckDisplay('complete-request');
        }
      })
      .catch(error => console.error(error));
  }
  submitReview(review) {
    fetch('api/submit_review.php', {
      'method': 'POST',
      'body': JSON.stringify(review)
    })
      .then(response => response.ok ? response : Promise.reject(new Error('There was an error submitting the review')))
      .then(() => {
        openAlert({ message: 'Thank you for submitting your review!', type: 'success' });
      })
      .then(() => {
        const updatedRequests = this.state.userRequests.filter(request => request.request_id !== review.request_id);
        this.setState({ userRequests: updatedRequests });
      })
      .then(() => {
        this.setCheckDisplay('requests');
      })
      .catch(error => {
        console.error(error);
        openAlert({ message: 'There was an issue submitting your review.', type: 'danger' });
      });
  }
  userReviewData(id) {
    const currentUserToReview = this.state.usersWhoCommitedToYourRequest.find(user => user.commit_id === id);
    this.setState({ userToSendReview: currentUserToReview });
  }
  generateUsersRequests() {
    return (
      this.state.userRequests.map(request => {
        return <CheckRequests
          key={request.request_id}
          requestId={request.request_id}
          headline ={request.headline}
          cancelCallback={this.cancelADeedRequest}
          completeCallback={this.setUserDataForRequest}
        />;
      })
    );
  }
  generateUsersCommits() {
    return (
      this.state.userCommits.map(commit => {
        return <CheckCommits
          key={commit.commit_id}
          commitId={commit.commit_id}
          headline ={commit.headline}
          image={commit.image_url}
          setDeed={this.setDeed}
          setView={this.setCheckDisplay}
        />;
      })
    );
  }
  generateDeed() {
    if (this.state.commitToDisplay) {
      return <Deed
        username={this.state.commitToDisplay.user_id}
        image={this.state.commitToDisplay.image_url}
        headline={this.state.commitToDisplay.headline}
        summary={this.state.commitToDisplay.summary}
        zipcode={this.state.commitToDisplay.zipcode}
        id={this.state.commitToDisplay.commit_id}
        changeView={this.setCheckDisplay}
        view={'commits'}
        commitToDeed={this.cancelACommitToADeed}
        secondButton={'CANCEL'}
      />;
    }
  }
  generateUsersWhoCommitedToRequest() {
    return (
      this.state.usersWhoCommitedToYourRequest.map(user => {
        return <CompleteRequestUser
          key={user.user_id}
          commitId={user.commit_id}
          username={user.username}
          image={user.image_url}
          reviewData={this.userReviewData}
          changeView={this.setCheckDisplay}
        />;
      })
    );
  }
  generateReviewForm() {
    const { request_id: requestId, user_id: recievingUserId, commit_id: commitId } = this.state.userToSendReview;
    const { id: sendingUserId } = this.props.userData;
    return (
      <LeaveReview
        requestId={requestId}
        commitId={commitId}
        recievingUserId={recievingUserId}
        sendingUserId={sendingUserId}
        submitReview={this.submitReview}
      />
    );
  }
  componentDidMount() {
    fetch(`api/user_requests_commits.php?id=${this.props.userData.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ userRequests: data.requests, userCommits: data.commits });
      })
      .catch(error => console.error(error));
  }
  renderCheckDisplay() {
    if (this.state.userRequests === null && this.state.view === 'requests') {
      return 'loading requests...';
    }
    if (this.state.userRequests.length === 0 && this.state.view === 'requests') {
      return 'You have no requests';
    }
    if (this.state.userRequests !== null && this.state.view === 'requests') {
      return this.generateUsersRequests();
    }
    if (this.state.userCommits !== null && this.state.view === 'commits') {
      return this.generateUsersCommits();
    }
    if (this.state.userCommits === null && this.state.view === 'commits') {
      return 'loading commits...';
    }
    if (this.state.userCommits.length === 0 && this.state.view === 'commits') {
      return 'You have no commits';
    }
    if (this.state.view === 'deed') {
      return this.generateDeed();
    }
    if (this.state.view === 'complete-request') {
      return (
      <>
        <div className="heading" style={{ 'color': 'white' }}>Which user completed your deed?</div>
        {this.generateUsersWhoCommitedToRequest()}
        </>
      );
    }
    if (this.state.view === 'review-form' && this.state.userToSendReview !== null) {
      return this.generateReviewForm();
    }
    if (this.state.view === 'review-form' && this.state.userToSendReview === null) {
      return 'Loading Review Form...';
    }
  }
  render() {
    const selected = this.selectedButton(this.state.view);
    const display = this.renderCheckDisplay();
    return (
      <div className="container">
        <Alert />
        <Header/>
        <div className="checkDeedButtonContainer">
          <button onClick={() => this.setCheckDisplay('requests')} className = {selected[0]}>REQUESTS</button>
          <button onClick={() => this.setCheckDisplay('commits')} className = {selected[1]}>COMMITS</button>
        </div>
        <div className="checkContainer">
          {display}
        </div>
        <Footer setView={this.props.setView} />
      </div>
    );
  }
}

export default Check;
