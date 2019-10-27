import React from 'react';
import Header from './header';
import Footer from './footer';
import Categories from './categories';
import DeedList from './deed-list';
import Deed from './deed';
import Map from './map';
import Alert, { openAlert } from 'simple-react-alert';
import { request } from 'https';

class Commit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      deedList: [],
      view: 'categoryList',
      categoryFetchCompleted: false,
      categoryToDisplay: null,
      deedListFetchCompleted: false,
      deedToDisplay: null,
      currentLocation: null,
      gotUserLocation: false
    };
    this.changeCommitView = this.changeCommitView.bind(this);
    this.getDeeds = this.getDeeds.bind(this);
    this.getDeedToDisplay = this.getDeedToDisplay.bind(this);
    this.userCommitToDeed = this.userCommitToDeed.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }
  componentDidMount() {
    fetch('api/categories.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categoryList: data, categoryFetchCompleted: true });
      })
      .catch(error => console.error(error));
  }
  getUserLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const location = {};
      location.lat = position.coords.latitude;
      location.lng = position.coords.longitude;
      this.setState({ currentLocation: location, gotUserLocation: true }, () => this.getDeeds(this.state.categoryToDisplay));
    });
  }
  getDeeds(categoryId) {
    this.setState({ categoryToDisplay: categoryId });
    let fetchRequest;
    if (!this.state.gotUserLocation) {
      fetchRequest = `api/deeds.php?catid=${categoryId}&id=${this.props.userData.id}`;
    } else {
      fetchRequest = `api/deeds.php?catid=${categoryId}&id=${this.props.userData.id}&lat=${this.state.currentLocation.lat}&long=${this.state.currentLocation.lng}`;
    }
    fetch(fetchRequest)
      .then(response => response.json())
      .then(data => {
        this.setState({ deedList: data, deedListFetchCompleted: true });
      })
      .catch(error => console.error(error));
  }
  generateCategoryList() {
    if (this.state.categoryFetchCompleted) {
      return (
        <>
        <div className="heading">CHOOSE YOUR CATEGORY</div>
        <div className="categoryList">
          {this.state.categoryList.map(category => {
            return <Categories key={category.category_id} id={category.category_id} nextView ={'deedList'}name={category.name} changeView={this.changeCommitView} select={this.getDeeds}/>;
          })}
        </div>
      </>
      );
    } else {
      return 'loading categories...';
    }
  }
  generateDeedList() {
    if (this.state.deedListFetchCompleted) {
      return (
        <div className="container">
          <div className="deedListContainer">
            {this.state.deedList.map(deed => {
              return <DeedList key={deed.request_id} id={deed.request_id} getDeed={this.getDeedToDisplay} headline={deed.headline} image_url={deed.image_url}/>;
            })}
          </div>
          <div className="deedListButtonContainer">
            <button onClick={() => this.changeCommitView('categoryList')}>BACK</button>
          </div>
        </div>
      );
    } else {
      return 'loading deeds...';
    }
  }
  userCommitToDeed(requestId, requestersUserId) {
    fetch('api/commit_deed.php', {
      'method': 'POST',
      'body': JSON.stringify(
        {
          'request_id': requestId,
          'requesters_user_id': requestersUserId,
          'user_id': this.props.userData.id })
    })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('You have already commited to this deed.')))
      .then(() => {
        openAlert({ message: 'Deed successfully commited to!', type: 'success' });
      })
      .catch(() => {
        openAlert({ message: 'You have already commited to this deed.', type: 'danger' });
      });
  }
  generateMap() {
    if (!this.state.gotUserLocation) {
      return (
        <div className="awaitingUserLocation">
          AWAITING USERS LOCATION
        </div>
      );
    } else {
      return <Map
        currentLocation={this.state.currentLocation}
        deeds={this.state.deedList}
        commitToDeed={this.userCommitToDeed}
      />;
    }
  }
  generateDeed() {
    if (this.state.deedToDisplay) {
      return <Deed
        username={this.state.deedToDisplay.username}
        requestersId={this.state.deedToDisplay.request_user_id}
        image={this.state.deedToDisplay.image_url}
        headline={this.state.deedToDisplay.headline}
        summary={this.state.deedToDisplay.summary}
        zipcode={this.state.deedToDisplay.zipcode}
        id={this.state.deedToDisplay.request_id}
        changeView={this.changeCommitView}
        view={'deedList'}
        commitToDeed={this.userCommitToDeed}
        secondButton={'COMMIT'}
      />;
    }
  }
  getDeedToDisplay(id) {
    const deed = this.state.deedList.find(deed => deed.request_id === id);
    this.setState({ deedToDisplay: deed, view: 'deed' });
  }
  changeCommitView(newView) {
    this.setState({ view: newView });
  }
  commitDisplay() {
    switch (this.state.view) {
      case 'categoryList':
        return this.generateCategoryList();
      case 'deedList':
        return this.generateDeedList();
      case 'deed':
        return this.generateDeed();
      case 'map':
        return this.generateMap();
    }
  }
  deedViewNavigation() {
    function selectedButton(view) {
      if (view === 'deedList') return ['selected', ''];
      if (view === 'map') return ['', 'selected'];
      return ['', ''];
    }
    const selected = selectedButton(this.state.view);
    return (
      <div className="deedNavigationHeader">
        <button onClick={() => this.changeCommitView('deedList')} className={`deedListButton ${selected[0]}`}>LIST</button>
        <button onClick={this.getUserLocation} className="deedListLocation fas fa-map-marker-alt"></button>
        <button onClick={() => this.changeCommitView('map')} className={`deedListButton ${selected[1]}`}>MAP</button>
      </div>
    );
  }
  render() {
    const display = this.commitDisplay();
    const deedNavigation = this.state.view === 'deedList' || this.state.view === 'map' ? this.deedViewNavigation() : '';
    return (
      <div className="container">
        <Alert />
        <Header />
        {deedNavigation}
        {display}
        <Footer setView={this.props.setView} />
      </div>
    );
  }
}

export default Commit;
