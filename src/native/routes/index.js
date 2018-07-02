import React from 'react';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';
import RecipeEditComponent from '../components/RecipeEdit';


import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import BlendersContainer from '../../containers/Blenders';
import BlendersComponent from '../components/Blenders';
import BlenderViewComponent from '../components/Blender';

import DevicesContainer from '../../containers/Devices';
import DevicesComponent from '../components/Devices';
import DeviceViewComponent from '../components/Device';
import LwebView from '../components/Web'

import ReportsComponent from '../components/Reports';
import MaintenanceComponent from '../components/Maintenance';



const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={true}
        {...DefaultProps.tabProps}
      >
      <Stack
          key="profile"
          title="Map"
          icon={() => <Icon name="map" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene 
            key="maint"
            title="Prospect Finder"
            {...DefaultProps.navbarProps}
            component={DevicesContainer}
            Layout={MaintenanceComponent}
          />
      </Stack>
      <Stack
        key="recipes"
        title="List"
        icon={() => <Icon name="list-box" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
      <Scene
      key="devices"
      title="Prospect Finder"
      {...DefaultProps.navbarProps}
      component={DevicesContainer}
      Layout={DevicesComponent}
    />
      </Stack>
      </Tabs>
    </Scene>
    <Scene
            key="login"
            title="LOGIN"

            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      rightTitle="Edit"
      onRight={()=>{Actions.recipeEdit({ match: { params: { id: "1" } } });}}
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    />
    <Scene
      back
      clone
      key="device"
      title="Prospect"
      {...DefaultProps.navbarProps}
      component={DevicesContainer}
      Layout={DeviceViewComponent}
    />
    <Scene
      back
      clone
      key="web"
      title="LinkedIn"
      {...DefaultProps.navbarProps}
      component={DevicesContainer}
      Layout={LwebView}
    />
    <Scene
      back
      clone
      key="recipeEdit"
      title="RECIPE"
      rightTitle="Save"
      onRight={()=>{Actions.pop();}}
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeEditComponent}
    />
  </Stack>
);

export default Index;
