import React from 'react';
import Login from './login';
import Dashboard from './dashboard';
import Commit from './commit';
import Request from './request';
import Check from './check';
import Settings from './settings';
import { throws } from 'assert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      view: 'login'
    };
    this.getUserData = this.getUserData.bind(this);
    this.setView = this.setView.bind(this);
    this.updateProfileImage = this.updateProfileImage.bind(this);
    this.logout = this.logout.bind(this);
  }
  setView(newView) {
    this.setState({ view: newView });
  }
  updateProfileImage(url) {
    const copyUserData = Object.assign({}, this.state.userData);
    copyUserData.image_url = url;
    this.setState({ userData: copyUserData });
  }
  logout() {
    this.setState({ view: 'login', userData: null });
  }
  getUserData(userDataToGet) {
    fetch('/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDataToGet)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ userData: data }, () => {
          if (this.state.userData !== null) this.setView('dashboard');
        }
        );
      })
      .catch(error => console.error(error));
  }
  display() {
    if (this.state.view === 'login') {
      return <Login getUserData={this.getUserData} />;
    }
    if (this.state.view === 'dashboard') {
      return <Dashboard userData ={this.state.userData} setView={this.setView}/>;
    }
    if (this.state.view === 'commit') {
      return <Commit userData={this.state.userData} setView={this.setView} />;
    }
    if (this.state.view === 'request') {
      return <Request userData={this.state.userData} setView={this.setView} />;
    }
    if (this.state.view === 'check') {
      return <Check userData={this.state.userData} setView={this.setView} />;
    }
    if (this.state.view === 'settings') {
      return <Settings userData={this.state.userData} setView={this.setView} updateProfileImage={this.updateProfileImage} logout={this.logout}/>;
    }
  }

  render() {
    const pageToRender = this.display();
    return pageToRender;
  }
}

export default App;
