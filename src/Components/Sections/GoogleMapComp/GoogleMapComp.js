import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComp = ({data}) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 25.281374, // Replace with your desired map center latitude
    lng: 55.379073, // Replace with your desired map center longitude
  };

  const zoom = 16; // Replace with your desired zoom level

  return (
    <LoadScript googleMapsApiKey="AIzaSyC44tHpw6HMqQKV1_OSTcAWcw97o_fo8Gs"> {/* Replace with your actual Google Maps API key */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComp;
