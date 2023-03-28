import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '100vh'
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD1GPcoYC5xQBoLR9CXCUvNsPX1feeoeMo"
  });

  return (
    (isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 44, lng: -88 }}
        zoom={10}
      />
    ) : <></>)
  );
};

export default App;
