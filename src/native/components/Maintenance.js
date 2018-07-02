import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Error from './Error';
import Spacer from './Spacer';
import { Actions } from 'react-native-router-flux';


const MaintenanceView = ({
  error,
  devices,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Device from all devices
 
 
  // Devices not found
  if (!devices) return <Error content={ErrorMessages.device404} />;

  const onPress = item => Actions.device({ match: { params: { id: item } } });  

  return (
    <Container>
      <MapView
      style={{ alignSelf: 'stretch', height: 900 }}
      initialRegion={{
        latitude: 40.744905,
        longitude: -73.985501,
        latitudeDelta: 0.161,
        longitudeDelta: 0.0222,
      }}
    >
      {devices.map(marker=>{
        var lat = Number(marker.latitude);
        var lon = Number(marker.longitude);
        if(parseFloat(marker.probability) > 66){return <Marker
          key={marker.id}
          coordinate={{latitude:lat, longitude:lon}}
          title={marker.probability}
          description={marker.name.first+" "+marker.name.last}
          image={marker.isActive ? require('../../images/gpinc.png') : require('../../images/gpinp.png')}
          onCalloutPress={() => onPress(marker)}
         />
        }else if(parseFloat(marker.probability) > 33 ){return <Marker
          key={marker.id}
          coordinate={{latitude:lat, longitude:lon}}
          title={marker.probability}
          description={marker.name.first+" "+marker.name.last}
          image={marker.isActive ? require('../../images/ypinc.png') : require('../../images/ypinp.png')}
          onCalloutPress={() => onPress(marker)}
         />
        }else {return <Marker
          key={marker.id}
          coordinate={{latitude:lat, longitude:lon}}
          title={marker.probability}
          description={marker.name.first+" "+marker.name.last}
          image={marker.isActive ? require('../../images/rpinc.png') : require('../../images/rpinp.png')}
          onCalloutPress={() => onPress(marker)}
         />
        }
      })}
    </MapView>
        </Container>
  );
};

MaintenanceView.propTypes = {
  error: PropTypes.string,
  devices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

MaintenanceView.defaultProps = {
  error: null,
};

export default MaintenanceView;
