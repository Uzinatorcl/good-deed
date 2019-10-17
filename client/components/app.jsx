import React from 'react';
import Login from './login';
import Dashboard from './dashboard';
import Commit from './commit';
import Request from './request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      view: 'login'
    };
    this.getUserData = this.getUserData.bind(this);
    this.setView = this.setView.bind(this);
  }
  setView(newView) {
    this.setState({ view: newView });
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
  }

  render() {
    const pageToRender = this.display();
    return pageToRender;
  }
}

export default App;
