import React from 'react';
import Header from './header';
import Footer from './footer';
import CheckRequests from './check-requests';

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'requests',
      userRequests: null,
      userCommits: null
    };
    this.setCheckDisplay = this.setCheckDisplay.bind(this);
  }

  setCheckDisplay(newView) {
    this.setState({ view: newView });
  }
  selectedButton(view) {
    if (view === 'requests') return ['selected', ''];
    if (view === 'commits') return ['', 'selected'];
    return ['', ''];
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
  componentDidMount() {
    fetch(`api/user_get_requests.php?id=${this.props.userData.id}`)
      .then(response => response.json())
      .then(data => this.setState({ userRequests: data }))
      .catch(error => console.error(error));
  }
  renderCheckDisplay() {
    if (this.state.userRequests !== null && this.state.view === 'requests') {
      return this.generateUsersRequests();
    }
    if (this.state.userRequests == null && this.state.view === 'requests') {
      return 'loading requests...';
    }
    if (this.state.userRequests.length === 0 && this.state.view === 'requests') {
      return 'You have no requests';
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
