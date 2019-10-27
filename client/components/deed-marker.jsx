import React from 'react';

class DeedMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }
  markerDisplay() {
    const { image_url, request_id, request_user_id } = this.props.deed;
    if (this.state.isClicked) {
      return (
        <div className="markerDeed">
          <div className="markerImage" style={{ backgroundImage: `url(${image_url})` }}/>
          <div className="markerDeedInfo">
            <div className="markerHeadline">
              {this.props.deed.headline}
            </div>
            <div className="markerSummary">
              {this.props.deed.summary}
            </div>
          </div>
          <button onClick={() => this.props.commitToDeed(request_id, request_user_id)} className="markerButton">COMMIT</button>
        </div>
      );
    } else {
      return (
        <div className='deedMarker'/>
      );
    }
  }
  render() {
    return (
      <div onClick={() => this.setState({ isClicked: !this.state.isClicked })} className="markerContainer">
        {this.markerDisplay()}
      </div>
    );
  }
}

export default DeedMarker;
