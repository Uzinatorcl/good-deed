import React from 'react';
import apiKeys from './apikeys';
import DeedMarker from './deed-marker';
import GoogleMapReact from 'google-map-react';
class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  renderMarkers() {
    return (
      this.props.deeds.map(deed => {
        return (
          <DeedMarker
            key={deed.request_id}
            deed={deed}
            lat={deed.latitude}
            lng={deed.longitude}
            class={'deedMarker'}
          />
        );
      })
    );
  }
  render() {
    console.log(this.props.deeds);
    return (
      <div style={{ height: '77vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKeys.maps }}
          defaultCenter={this.props.currentLocation}
          defaultZoom={12}
        >
          <DeedMarker
            lat={this.props.currentLocation.lat}
            lng={this.props.currentLocation.lng}
            class={'userMarker'}
          />
          {this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
