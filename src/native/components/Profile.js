import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left,Right, Thumbnail, Text, Icon, H3, H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import Spacer from './Spacer';


const Profile = ({ member, logout }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Header
                title="Dashboard"//{`Hi ${member.firstName},`}
                content={`You are currently logged in as ${member.email}`}
              />
            </Content>

            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                <Icon name="person-add" />
              </Left>
              <Body>
                <Text>Update My Profile</Text>
              </Body>
            </ListItem>
            <ListItem onPress={logout} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
              <H1>
              Hi there, Amy
              </H1>
              <ListItem>
              <Left style={{marginRight:-100}}>
                <Thumbnail large source={{ uri: 'https://secure.i.telegraph.co.uk/multimedia/archive/03249/archetypal-female-_3249633c.jpg' }} />
              </Left>
              <Body>
                <Text>Title: Store Manager</Text>
                <Text note>Employee #: 7145768</Text>
                <Text note>Last Login: 7:43 am</Text>
              </Body>
              </ListItem>
            </Content>

            <H3 style={{ paddingLeft: 15 }}>Data Reporting</H3>
            <ListItem onPress={Actions.devices} icon>
              <Body>
                <Text>Data</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.maint} icon>
              <Body>
                <Text>Maintenance</Text>
              </Body>
            </ListItem>
            

            <Spacer size={15} />
            <H3 style={{ paddingLeft: 15 }}>Account Settings</H3>

            <ListItem onPress={Actions.signUp} icon>
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Legal</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon>
              <Left>
                <Icon name="help-buoy" />
              </Left>
              <Body>
                <Text>Support</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.login} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
