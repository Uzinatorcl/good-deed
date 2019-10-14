import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'commit'
    };
  }
  render() {
    console.log(this.props.userData);
    return null;
  }
}

export default Dashboard;
