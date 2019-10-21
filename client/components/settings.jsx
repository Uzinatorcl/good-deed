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
    this.fixImagePath = this.fixImagePath.bind(this);
  }

  fixImagePath(string) {
    return string.substr(3);
  }

  updatePhoto(event) {
    event.preventDefault();
    const data = new FormData();
    const photoToUpload = event.target.files[0];
    data.append('profilePhoto', photoToUpload);
    fetch('api/upload_profile_photo.php', {
      'method': 'POST',
      'body': data
    })
      .then(response => response.json())
      .then(data => data.success ? data : Promise.reject(new Error(data.message)))
      .then(data => this.setState({ userImage: data }))
      .catch(() => openAlert({ message: 'There was an updating your profile image.', type: 'danger' }));

    event.preventDefault();
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
            {/* <input type="file"
            id="profileImage" name="profileImage"
            accept="image/png, image/jpeg"/ > */}
            <label className="fileContainer">
              <button className="updatePhotoButton">UPDATE PHOTO</button>
              <input onChange={this.updatePhoto} type="file"
                id="profileImage" name="profileImage"
                accept="image/png, image/jpeg" />
            </label>
            <button>ACCOUNT INFO</button>
            <button>LOG OUT</button>
          </div>
        </div>
        <Footer setView={this.props.setView} />
      </>
    );
  }
}

export default Settings;
