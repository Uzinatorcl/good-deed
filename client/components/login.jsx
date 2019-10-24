import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      view: 'homepage'
    };
    this.dailyquotes = [
      '“How far that little candle throws his beams! So shines a good deed in a weary world.” ― William Shakespeare',
      '“I cannot do all the good that the world needs. But the world needs all the good that I can do.” ― Jana Stanfield',
      '“Death doesn\'t care, it takes away no matter who you you are, do good when you are still alive” ― Mary Uwamahoro',
      '“The person who is always involved in good deeds, expand knowledge, experiences incessant inner self divine gets most of the time happiness in life.” ― Shreeom Surye Shiva',
      '“A good leader\'s words are his deeds.Be a good a leader.” ― Wisdom Kwashie Mensah'
    ];
    this.setView = this.setView.bind(this);
    this.trackUsername = this.trackUsername.bind(this);
    this.trackPassword = this.trackPassword.bind(this);
    this.sendUserData = this.sendUserData.bind(this);
  }
  trackUsername(event) {
    this.setState({ username: event.target.value });
  }
  trackPassword(event) {
    this.setState({ password: event.target.value });
  }
  sendUserData() {
    const dataObject = {
      'username': this.state.username,
      'password': this.state.password
    };
    this.props.getUserData(dataObject);
  }
  setView(newView) {
    this.setState({ view: newView });
  }
  loginScreen() {
    if (this.state.view === 'homepage') {
      return (
        <div className="container loginContainer">
          <header className="loginHeader">
            <h1>THE</h1>
            <h1>GOOD</h1>
            <h1>DEED</h1>
          </header>
          <div className="dailyQuote">{this.dailyquotes[Math.floor(Math.random() * this.dailyquotes.length)].toUpperCase()}</div>
          <div className="buttonContainer">
            <button onClick={() => this.setView('loginscreen')}>LOGIN</button>
            <button>SIGNUP</button>
          </div>
        </div>
      );
    } else if (this.state.view === 'loginscreen') {
      return (
        <div className="container loginContainer">
          <header className="loginHeader">
            <h1>THE</h1>
            <h1>GOOD</h1>
            <h1>DEED</h1>
          </header>
          <div className="loginFormContainer">
            <form className="loginForm">
              <input type="text" className="loginFormBox" id="username" placeholder="USERNAME" onChange={this.trackUsername} />
              <input type="password" className="loginFormBox" id="password" placeholder="PASSWORD" onChange={this.trackPassword} />
            </form>
          </div>
          <div className="buttonContainer">
            <button onClick={this.sendUserData}>LOGIN</button>
          </div>
        </div>
      );
    }
  }
  render() {
    const display = this.loginScreen();
    return display;
  }
}

export default Login;
