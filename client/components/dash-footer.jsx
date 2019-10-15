import React from 'react';

class DashFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: 'COMMIT',
      isLeftArrowHidden: false,
      isRightArrowHidden: false
    };
    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
  }
  navigateLeft() {
    switch (this.state.button) {
      case 'CHECK':
        this.setState({ button: 'REQUEST', isRightArrowHidden: false });
        break;
      case 'REQUEST':
        this.setState({ button: 'COMMIT' });
        break;
      case 'COMMIT':
        this.setState({ button: 'MESSAGES' });
        break;
      case 'MESSAGES':
        this.setState({ button: 'SETTINGS', isLeftArrowHidden: true });
        break;
    }
  }
  navigateRight() {
    switch (this.state.button) {
      case 'SETTINGS':
        this.setState({ button: 'MESSAGES', isLeftArrowHidden: false });
        break;
      case 'MESSAGES':
        this.setState({ button: 'COMMIT' });
        break;
      case 'COMMIT':
        this.setState({ button: 'REQUEST' });
        break;
      case 'REQUEST':
        this.setState({ button: 'CHECK', isRightArrowHidden: true });
        break;
    }
  }
  arrowHide() {
    if (this.state.isLeftArrowHidden) return ['hidden', ''];
    if (this.state.isRightArrowHidden) return ['', 'hidden'];
    return ['', ''];
  }
  render() {
    const arrowToHide = this.arrowHide();
    return (
      <footer className="dashboardNavi">
        <div onClick={this.navigateLeft} className={`leftArrow fas fa-arrow-circle-left ${arrowToHide[0]}`}></div>
        <button className="dashboardNaviButton">{this.state.button}</button>
        <div onClick={this.navigateRight} className={`rightArrow fas fa-arrow-circle-right ${arrowToHide[1]}`}></div>
      </footer>
    );
  }
}

export default DashFooter;
