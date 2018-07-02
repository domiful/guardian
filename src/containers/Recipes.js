import React, { Component } from 'react';
import {Notifications, Permissions} from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRecipes, getMeals, setError, updateRecipes, registerForPushNotificationsAsync } from '../actions/recipes';

class RecipeListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    recipes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getRecipes: PropTypes.func.isRequired,
    //updateRecipes: PropTypes.func.isRequired,
    getMeals: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    registerForPushNotificationsAsync: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      notification: null
    };

  }

  componentDidMount = () => this.fetchRecipes();

  componentWillMount(){
    this.fetchRecipes();
    //registerForPushNotificationsAsync();
    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {
    this.setState({notification: notification});
    console.log(notification);
  };
  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRecipes = () => {
    return this.props.getRecipes()
      .then(() => this.props.getMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, recipes, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        recipeId={id}
        error={recipes.error}
        loading={recipes.loading}
        recipes={recipes.recipes}
        reFetch={() => this.fetchRecipes()}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
});

const mapDispatchToProps = {
  getRecipes,
  updateRecipes,
  getMeals,
  setError,
  registerForPushNotificationsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
