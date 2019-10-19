import React from 'react';
import Header from './header';
import Footer from './footer';
import CheckRequests from './check-requests';
import CheckCommits from './check-commits';
import Deed from './deed';

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'requests',
      userRequests: null,
      userCommits: null,
      commitToDisplay: null
    };
    this.setCheckDisplay = this.setCheckDisplay.bind(this);
    this.setDeed = this.setDeed.bind(this);
    this.cancelACommitToADeed = this.cancelACommitToADeed.bind(this);
  }

  setCheckDisplay(newView) {
    this.setState({ view: newView });
  }
  cancelACommitToADeed() {
    console.log('cancel registering');
  }
  selectedButton(view) {
    if (view === 'requests') return ['selected', ''];
    if (view === 'commits') return ['', 'selected'];
    return ['', ''];
  }
  setDeed(id) {
    const deedToSet = this.state.userCommits.find(commit => commit.commit_id === id);
    console.log(deedToSet);
    this.setState({ commitToDisplay: deedToSet });
  }
  generateUsersRequests() {
    return (
      this.state.userRequests.map(request => {
        return <CheckRequests
          key={request.request_id}
          requestId={request.request_id}
          headline ={request.headline}
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
        id={this.state.commitToDisplay.request_id}
        changeView={this.setCheckDisplay}
        view={'commits'}
        commitToDeed={this.cancelACommitToADeed}
        secondButton={'DELETE'}
      />;
    }
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
    if (this.state.userRequests !== null && this.state.view === 'requests') {
      return this.generateUsersRequests();
    }
    if (this.state.userRequests === null && this.state.view === 'requests') {
      return 'loading requests...';
    }
    if (this.state.userRequests.length === 0 && this.state.view === 'requests') {
      return 'You have no requests';
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
  }
  render() {
    const selected = this.selectedButton(this.state.view);
    const display = this.renderCheckDisplay();
    return (
      <div className="container">
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
