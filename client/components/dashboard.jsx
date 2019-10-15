import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'commit'
    };
  }
  componentDidMount() {
    fetch('api/get-review.php');
  }
  render() {
    console.log(this.props.userData);
    return (
      <div className="container">

      </div>
    );
  }
}

export default Dashboard;
