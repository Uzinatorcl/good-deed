import React from 'react';
import Header from './header';
import Footer from './footer';
import Alert, { openAlert } from 'simple-react-alert';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: this.props.userData.image_url
    };
    this.updatePhoto = this.updatePhoto.bind(this);
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

  render() {
    return (
      <>
        <Alert/>
        <Header />
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
            <button>ACCOUNT INFO</button>
            <button onClick={this.props.logout}>LOG OUT</button>
          </div>
        </div>
        <Footer setView={this.props.setView} />
      </>
    );
  }
}

export default Settings;
