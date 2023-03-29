import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';
import { FiLoader } from "react-icons/fi";
import { useMemo } from 'react';

const Map = () => {

    const containerStyle = {
        width: '100%',
        height: '90vh'
      };

     const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const center = useMemo(()=> ({lat:-44, lng: -80}), [])
  
return(
       (isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      />
    ) : <> 
     <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
    
    </>)
)

};

const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 80vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Map