import React from 'react';
import PropTypes from 'prop-types';
import { Image, Alert, WebView } from 'react-native';
import { Segment, Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text, Button, Icon, Thumbnail } from 'native-base';
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';

import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import { putLoan } from '../../actions/devices';


const nid = null;
const messages = null;

const LwebView = ({
  error,
  deviceId,
  fetchOne,
}) => {
  // Error
  console.log(deviceId);
  if (error) return <Error content={error} />;




  // Lweb not found
  if (!deviceId) return <Error content={ErrorMessages.device404} />;

  

  
  return (
    <Container>
      <Content>
      <WebView
        source={{uri: deviceId}}
        style={{ alignSelf: 'stretch', flex: 1,height: 900 }}
        />  
      </Content>
    </Container>
  );
};

LwebView.propTypes = {
  error: PropTypes.string,
  deviceId: PropTypes.string.isRequired,
};

LwebView.defaultProps = {
  error: null,
  deviceId: null,
  fetchOne: null,
};

export default LwebView;


