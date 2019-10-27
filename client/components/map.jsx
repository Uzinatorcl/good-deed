import React from 'react';
import apiKeys from './apikeys';
import GoogleMapReact from 'google-map-react';
class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: '77vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKeys.maps }}
          defaultCenter={this.props.currentLocation}
          defaultZoom={12}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
