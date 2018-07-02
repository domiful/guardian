import React from 'react';
import PropTypes from 'prop-types';
import { Image, Alert, Share } from 'react-native';
import { Segment, Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text, Button, Icon, Thumbnail, Tabs, Tab } from 'native-base';
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';

import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import { putLoan } from '../../actions/devices';


const nid = null;
const messages = null;

const onPress = (deviceId) =>{
  var nm = {"to": "PenFed Loan Processor",
    "message": "Please Contact me",
    "subject": "Support",
    "unread": true,
    "time": new Date().toLocaleString(),
    "from": "Nolan Corcoran",
  }
  Alert.alert(
    'Sent',
    "",
    
    { cancelable: false }
  );
  deviceId.messages.push(nm);
  putLoan(deviceId);

}
const DeviceView = ({
  error,
  deviceId,
  fetchOne,
}) => {
  // Error
  if (error) return <Error content={error} />;




  // Device not found
  if (!deviceId) return <Error content={ErrorMessages.device404} />;

  

  
  return (
    <Container>
      <Content padder>
      <Card>
            <CardItem>
              <Left>
                <Thumbnail large source={{uri: deviceId.image}} />
                <Body>
                  <H3>{deviceId.name.first}</H3>
                  <Text note>Address:</Text>
                  <Text>{deviceId.address}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Left><Text note>Probability</Text></Left>
              <Body><Text note>Company</Text></Body>
            </CardItem>
            <CardItem>
              <Left><Text style={{fontWeight:'bold'}}>{deviceId.probability}</Text></Left>
              <Body><Text>{deviceId.company}</Text></Body>
            </CardItem>
            <CardItem footer>
              <Left style={{flex:1}}>
                {deviceId.email === "" ? <Button disabled><Icon name='mail' /></Button> : <Button light onPress={()=>{Communications.email([deviceId.email],null,null,"Guardian Life Products",deviceId.name.first + ", my name is Joe McClanahan and I am a Customer Advisor for Guardian Life. I would like to set aside some time with you to review some offerings that our preliminary analysis indicates will match your current insurance and financial needs. Let me know your schedule during this week for a 30 minute conversation.");}}><Icon name='mail' /></Button>}
              </Left>
              <Body style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                {deviceId.phone === "" ? <Button disabled><Icon name='call' /></Button> : <Button success onPress={()=>{Communications.phonecall(deviceId.phone.replace(/\D+/g, ''), true);}}><Icon name='call' /></Button>}
              </Body>
              <Right style={{flex:1}}>
                {deviceId.linkedin === "" ? <Button disabled><Icon name='logo-linkedin' /></Button> : <Button onPress={()=>{Actions.web({ match: { params: { id: deviceId.linkedin } } });}}><Icon name='logo-linkedin' /></Button>}
              </Right>
            </CardItem>
          </Card>


          <Tabs
            initialPage={0}
            tabBarUnderlineStyle={{backgroundColor:"#B39329"}}>
            <Tab heading="Profile" tabStyle={{backgroundColor:"#2976AF"}} activeTabStyle={{backgroundColor:"#2976AF"}}>
            <Card>
              <CardItem header>
                  <Text>Profile Information</Text>
              </CardItem>
              <CardItem bordered>
                <Left><Text>Age</Text></Left>
                <Body><Text>Gender</Text></Body>
                <Left>
                  <Text>Zip</Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left><H3>{" "+" "+deviceId.age}</H3></Left>
                <Body><H3>{deviceId.gender}</H3></Body>
                <Left>
                  <H3>{" "+" "+deviceId.address.split(" ").pop()}</H3>
                </Left>
              </CardItem>
              <Spacer size={1} />
              <CardItem bordered>
                <Left><Text>Homeowner</Text></Left>
              </CardItem>
              <CardItem>
                <Left><H3>{" "+" "+deviceId.name.first+" "+deviceId.name.last}</H3></Left>
              </CardItem>
              <Spacer size={1} />
              <CardItem bordered>
                <Left><Text>Home Market Value</Text></Left>
              </CardItem>
              <CardItem>
                <Left><H3>{" "+" "+deviceId.house}</H3></Left>
              </CardItem>
              <Spacer size={1} />
              <CardItem bordered>
                <Left><Text>Household Income</Text></Left>
              </CardItem>
              <CardItem>
                <Left><H3>{" "+" "+deviceId.income}</H3></Left>
              </CardItem>
              <Spacer size={1} />
              <CardItem bordered>
                <Left><Text>Marital Status</Text></Left>
                <Body><Text>Children</Text></Body>
              </CardItem>
              <CardItem>
                <Left><H3>{" "+" "+deviceId.mstatus}</H3></Left>
                <Body><H3>{deviceId.children}</H3></Body>
              </CardItem>
            </Card>
            </Tab>
            <Tab heading="Recommended" tabStyle={{backgroundColor:"#2976AF"}} activeTabStyle={{backgroundColor:"#2976AF"}}>
            <Card>
            <CardItem header>
                <Text>Product Recommendations</Text>
            </CardItem>
            <CardItem bordered>
              <Left><Text>Life Insurance</Text></Left>
            </CardItem>
            <CardItem>
              <Left><H3>{" "+" "+deviceId.lifeIns}</H3></Left>
            </CardItem>
            <CardItem bordered>
              <Left><Text>Disability Insurance</Text></Left>
            </CardItem>
            <CardItem>
              <Left><H3>{" "+" "+deviceId.disabilityIns}</H3></Left>
            </CardItem>
            <CardItem bordered>
              <Left><Text>Investments</Text></Left>
            </CardItem>
            <CardItem>
              <Left><H3>{" "+" "+deviceId.investments}</H3></Left>
            </CardItem>
          </Card>
            </Tab>
          </Tabs>
      </Content>
    </Container>
  );
};

DeviceView.propTypes = {
  error: PropTypes.string,
  deviceId: PropTypes.string.isRequired,
};

DeviceView.defaultProps = {
  error: null,
  deviceId: null,
  fetchOne: null,
};

export default DeviceView;


