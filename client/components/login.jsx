import React from 'react';
import Header from './header';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signUpForm: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        zipcode: ''
      },
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
    this.trackSignUp = this.trackSignUp.bind(this);
    this.sendUserData = this.sendUserData.bind(this);
    this.createUserData = this.createUserData.bind(this);
  }
  trackUsername(event) {
    this.setState({ username: event.target.value });
  }
  trackPassword(event) {
    this.setState({ password: event.target.value });
  }
  trackSignUp({ target: { name, value } }) {
    const signUp = { ...this.state.signUpForm };
    signUp[name] = value;
    this.setState({ signUpForm: signUp });
  }
  sendUserData() {
    const dataObject = {
      'username': this.state.username,
      'password': this.state.password
    };
    this.props.getUserData(dataObject);
  }
  createUserData() {
    this.props.createUser(this.state.signUpForm);
    const initialSignUpForm = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      zipcode: ''
    };
    this.setState({ signUpForm: initialSignUpForm });
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
            <button onClick={() => this.setView('signup')}>SIGNUP</button>
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
            <button onClick={() => this.setView('homepage')}>BACK</button>
          </div>
        </div>
      );
    } else if (this.state.view === 'signup') {
      return (
        <>
        <Header/>
          <div className="signUpFormContainer">
            <form className="signUpForm">
              <input type="text" name="username" maxLength="61" className="signUpFormBox" placeholder="USERNAME" onChange={this.trackSignUp} value={this.state.signUpForm.username} />
              <input type="password" name="password" className="signUpFormBox" placeholder="PASSWORD" onChange={this.trackSignUp} value={this.state.signUpForm.password} />
              <input type="text" name="email" maxLength="254" className="signUpFormBox" placeholder="EMAIL" onChange={this.trackSignUp} value={this.state.signUpForm.email} />
              <input type="text" name="firstname" maxLength="61" className="signUpFormBox" placeholder="FIRSTNAME" onChange={this.trackSignUp} value={this.state.signUpForm.firstname} />
              <input type="text" name="lastname" maxLength="61" className="signUpFormBox" placeholder="LASTNAME" onChange={this.trackSignUp} value={this.state.signUpForm.lastname} />
              <input type="text" name="zipcode" maxLength="10" className="signUpFormBox" placeholder="ZIPCODE" onChange={this.trackSignUp} value={this.state.signUpForm.zipcode} />
            </form>
          </div>
          <div className="signupButtonContainer">
            <button onClick={this.createUserData}>SIGN UP</button>
            <button onClick={() => this.setView('homepage')}>BACK</button>
          </div>
        </>
      );
    }
  }
  render() {
    const display = this.loginScreen();
    return display;
  }
}

export default Login;
