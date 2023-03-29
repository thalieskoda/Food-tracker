import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = () => {

    const containerStyle = {
        width: '100%',
        height: '90vh'
      };

     const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD1GPcoYC5xQBoLR9CXCUvNsPX1feeoeMo"
  });

  
return(
       (isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 44, lng: -88 }}
        zoom={10}
      />
    ) : <></>)
)

}
export default Map