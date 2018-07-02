import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    activeTintColor:'rgba(255,255,155)',
    inactiveTintColor:'rgba(255,255,255)',
    activeBackgroundColor: 'rgba(255,255,255,0.2)',
    inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: Colors.brandPrimary },
    labelStyle: {color:'white', fontSize:11}
  },

  icons: {
    style: { color: 'white' },
  },
};
