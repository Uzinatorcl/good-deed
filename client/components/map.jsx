import React from 'react';
import apiKeys from './apikeys';
import DeedMarker from './deed-marker';
import GoogleMapReact from 'google-map-react';
class Map extends React.Component {
  renderMarkers() {
    return (
      this.props.deeds.map(deed => {
        return (
          <DeedMarker
            key={deed.request_id}
            deed={deed}
            lat={deed.latitude}
            lng={deed.longitude}
            commitToDeed={this.props.commitToDeed}
          />
        );
      })
    );
  }
  render() {
    return (
      <div style={{ height: '73vh', width: '100%', margin: '10px 0' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKeys.maps }}
          defaultCenter={this.props.currentLocation}
          defaultZoom={12}
        >
          <UserMarker {...this.props.currentLocation}/>
          {this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

function UserMarker(props) {
  return (
    <div className="userMarker"></div>
  );
}

export default Map;
