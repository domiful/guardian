import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, RefreshControl, Share } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text, Icon, Button, Thumbnail } from 'native-base';
import ErrorMessages from '../../constants/errors';
import { Actions } from 'react-native-router-flux';

import Error from './Error';
import Spacer from './Spacer';

const DeviceView = ({
  error,
  devices,
  reFetch
}) => {
  let refreshing = false;

  onRefresh = () => {
    refreshing = true;
    //reFetch().then(() => {
      refreshing = false;
    //});
    
  }
  // Error
  if (error) return <Error content={error} />;

  // Get this Device from all devices

 
  // Devices not found
  if (!devices) return <Error content={ErrorMessages.device404} />;

  const onPress = item => Actions.device({ match: { params: { id: item } } });
  // Build Method listing
  const devs = devices.map(item => {
    var ipath = '../../images/faces/'+item.image;
    return(<Card key={item.id}>
    <TouchableOpacity onPress={() => onPress(item)}>
          <CardItem header bordered>
          <Left style={{flex:0}}>
          
          {parseFloat(item.probability) > 66 ? <Button transparent><Icon style={{fontSize: 30, color: '#31CF52'}} name={item.isActive ? 'ios-checkmark-circle' : 'ios-star'} /></Button> : (parseFloat(item.probability) > 33 ? <Button transparent><Icon style={{fontSize: 30, color: '#FDB80F'}} name={item.isActive ? 'ios-checkmark-circle' : 'ios-star'} /></Button> : <Button transparent><Icon style={{fontSize: 30, color: '#AE0029'}} name={item.isActive ? 'ios-checkmark-circle' : 'ios-star'} /></Button>)}
          </Left>
          <Thumbnail small source={{uri: item.image}} />
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <H3>
           {item.name.first}</H3>
            
          <Right style={{flex:1}}>
              <H3 style={{textAlign:'right'}}>{item.probability}</H3>
          </Right>
          </CardItem>
            </TouchableOpacity>
        </Card>)
});

  return (
    <Container>
      <Content 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />
      }
      padder>
          
                {devs}
            </Content>
    </Container>
  );
};

DeviceView.propTypes = {
  error: PropTypes.string,
  devices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

DeviceView.defaultProps = {
  error: null,
  reFetch:null
};

export default DeviceView;
