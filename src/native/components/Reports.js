import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

import chart1 from '../../images/c1.png';
import chart2 from '../../images/c2.png';



const ReportView = ({
  error,
  devices,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Report from all reports
 
 
  // Reports not found
  if (!devices) return <Error content={ErrorMessages.report404} />;



  return (
    <Container>
      <Content padder>
        <Card>
        <CardItem>
        <H3>Messages Sent by Date</H3>
        </CardItem>
            <CardItem>
                <Image source={chart2} style={{ height: 300, width: null, flex: 1 }} />

            </CardItem>
        </Card>
        <Card>
          <CardItem>
          <H3>Percentage</H3>
          </CardItem>
            <CardItem>
                <Image source={chart1} style={{ height: 300, width: null, flex: 1 }} />

            </CardItem>
        </Card>
        </Content>
    </Container>
  );
};

ReportView.propTypes = {
  error: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ReportView.defaultProps = {
  error: null,
};



export default ReportView;
