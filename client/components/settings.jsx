import React from 'react';
import Header from './header';
import Footer from './footer';
import Alert, { openAlert } from 'simple-react-alert';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.userData.email,
      firstname: this.props.userData.firstname,
      lastname: this.props.userData.lastname,
      zipcode: this.props.userData.zipcode,
      userImage: this.props.userData.image_url,
      view: 'settings'
    };
    this.updatePhoto = this.updatePhoto.bind(this);
    this.updateAccountInfo = this.updateAccountInfo.bind(this);
    this.changeView = this.changeView.bind(this);
    this.trackEmail = this.trackEmail.bind(this);
    this.trackFirstname = this.trackFirstname.bind(this);
    this.trackLastname = this.trackLastname.bind(this);
    this.trackZipcode = this.trackZipcode.bind(this);
  }

  changeView(newView) {
    this.setState({ view: newView });
  }
  trackEmail(event) {
    this.setState({ email: event.target.value });
  }
  trackFirstname(event) {
    this.setState({ firstname: event.target.value });
  }
  trackLastname(event) {
    this.setState({ lastname: event.target.value });
  }
  trackZipcode(event) {
    this.setState({ zipcode: event.target.value });
  }
  updateAccountInfo() {
    const { email, firstname, lastname, zipcode } = this.state;
    if (email === this.props.userData.email && firstname === this.props.userData.firstname && lastname === this.props.userData.lastname && zipcode === this.props.userData.zipcode) {
      openAlert({ message: 'You didn\'t update anything', type: 'info' });
      return;
    }
    fetch('api/update_account_info.php', {
      'method': 'POST',
      'body': JSON.stringify({
        'user_id': this.props.userData.id,
        'email': email,
        'firstname': firstname,
        'lastname': lastname,
        'zipcode': zipcode
      })
    })
      .then(response => response.ok ? response : Promise.reject(new Error('There was an error updating the users profile')))
      .then(() => {
        this.props.updateAccountInformation(email, firstname, lastname, zipcode);
      })
      .then(() => {
        openAlert({ message: 'You have successfully updated your user information', type: 'success' });
      })
      .catch(() => {
        openAlert({ message: 'There was an error updating your account information', type: 'warning' });
      });
  }

  updatePhoto(event) {
    event.preventDefault();
    const data = new FormData();
    const photoToUpload = event.target.files[0];
    data.append('profilePhoto', photoToUpload);
    data.append('id', this.props.userData.id);
    fetch('api/upload_profile_photo.php', {
      'method': 'POST',
      'body': data
    })
      .then(response => response.json())
      .then(responseData => responseData.success ? responseData : Promise.reject(new Error(responseData.errors)))
      .then(responseData => {
        this.props.updateProfileImage(responseData.filepath);
        this.setState({ userImage: responseData.filepath }, () => {
          openAlert({ message: 'You have successfully updated your profile image.', type: 'success' });
        });
      })
      .catch(() => (
        openAlert({ message: 'There was an issue updating your profile image.', type: 'danger' })
      ));
  }
  generateDisplay() {
    if (this.state.view === 'settings') {
      return (
        <div className="container">
          <div className="userImageContainer">
            <img className="userImageSettings" src={this.state.userImage} alt="Your Profile Image" />
          </div>
          <div className="settingsButtonContainer">
            <label className="fileContainer">
              <button type="button" className="updatePhotoButton">UPDATE PHOTO</button>
              <input onChange={this.updatePhoto} type="file"
                id="profileImage" name="profileImage"
                accept="image/png, image/jpeg" />
            </label>
            <button className="accountInfoButton" onClick={() => this.changeView('accountInfo')}>ACCOUNT INFO</button>
            <button className="logoutButton" onClick={this.props.logout}>LOG OUT</button>
          </div>
        </div>
      );
    }
    if (this.state.view === 'accountInfo') {
      const { email, firstname, lastname, zipcode } = this.state;
      return (
        <div className="accountFormContainer">
          <div className="heading">ACCOUNT INFO</div>
          <div className="requestFormContainer">
            <form className="accountInfoForm">
              <input type="text" maxLength="254" className="emailBox" placeholder="EMAIL" onChange={this.trackEmail} value={email} />
              <input type="text" maxLength="62" className="firstnameBox" placeholder="FIRST NAME" onChange={this.trackFirstname} value={firstname} />
              <input type="text" maxLength="62" className="lastnameBox" placeholder="LAST NAME" onChange={this.trackLastname}value={lastname}/>
              <input type="text" maxLength="10" className="zipcodeBox" placeholder="ZIPCODE" onChange={this.trackZipcode} value={zipcode} />
            </form>
          </div>
          <div className="deedButtonContainer">
            <button onClick={() => this.changeView('settings')}>BACK</button>
            <button onClick={this.updateAccountInfo}>UPDATE</button>
          </div>
        </div>
      );
    }
  }
  render() {
    const display = this.generateDisplay();
    return (
      <>
        <Alert/>
        <Header />
        {display}
        <Footer setView={this.props.setView} />
      </>
    );
  }
}

export default Settings;
