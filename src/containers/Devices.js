import React, { Component } from 'react';
import {PushNotificationIOS, Alert} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLoans, getLoan, putLoan } from '../actions/devices';


class DeviceListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    devices: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      devices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getLoans: PropTypes.func.isRequired,
    getLoan: PropTypes.func.isRequired,
    putLoan: PropTypes.func.isRequired,


  }

  static defaultProps = {
    match: null,
  }

  componentDidMount () {

    //if(!device) this.fetchDevice(deviceId);
    this.fetchDevices();
  }

  componentWillMount(){
    this.fetchDevices();
  }

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchDevices = () => {
    return this.props.getLoans()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  fetchDevice = (device) => {
    return this.props.getLoan(device)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, devices, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        deviceId={id}
        error={devices.error}
        loading={devices.loading}
        devices={devices.devices}
        reFetch={() => this.fetchDevices()}
        fetchOne={(f) => this.fetchDevice(f)}
      />
    );
  }
}

const mapStateToProps = state => ({
  devices: state.devices || [],
  device: state.device || null,
});

const mapDispatchToProps = {
  getLoans,
  getLoan,
  putLoan,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListing);
