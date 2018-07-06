import React from 'react';
import { StyleSheet, Text,Button, Image, View } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
// dva
import dva from './app/utils/dva';
import models from './app/models'

/* config  */
import globalSetting from 'GlobalSetting'
import TransitionConfiguration from './app/config/transition'
/* dismiss yellow warning message */
import { YellowBox } from 'react-native';

/* screen  */
import DetailsScreen from './app/containers/home/DetailScreen'
import LoginScrren from './app/containers/login/LoginScreen'
import RegisterScrren from './app/containers/login/RegisterScreen'
import TabbarContainer from './app/containers/root/tabbarContainer'
import PersonalTabbarContainer from './app/containers/setting/personalTabbar'
import CircleView from './app/containers/home/TouchCircle'
import ChartsView from './app/containers/home/Charts'
import MapScreen from './app/containers/home/MapScreen'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// this is home page 
const MainNavigator = createStackNavigator({
  Home: {
    screen: TabbarContainer,
  },
  Circle: {
    screen: CircleView,
  },
  Charts:{
    screen: ChartsView
  },
  Map:{
    screen: MapScreen
  },
  Details: {
    screen: DetailsScreen,
    transitionConfig: TransitionConfiguration,
    navigationOptions: {
      // headerTitle: 'Details',
      headerTitleStyle:{flex: 1,textAlign:'center'},
      // headerBackTitle: 'BackTo'
      headerMode: 'float'
    },
  },
  PersonalTabbar: {
    screen: PersonalTabbarContainer,
    navigationOptions: {
      headerTitle: 'Personal-title',
      headerTitleStyle:{flex: 1,textAlign:'center'},
    },
  }
},{
  navigationOptions : globalSetting.navigationOptions,
  // transitionConfig: TransitionConfiguration
  headerLeft: (<Text>测试</Text>)
});

// this is register page
const RegisterNaivgatot = createStackNavigator({
  Login: { 
    screen: LoginScrren,
    navigationOptions: {
      headerTitle: 'LoginScreen',
      headerTitleStyle:{flex: 1,textAlign:'center'},
      headerMode: 'float'
    }
  },
  Register: { 
    screen: RegisterScrren,
    navigationOptions: {
      headerTitle: 'RegisterScrren',
      headerTitleStyle:{flex: 1,textAlign:'center'},
      headerMode: 'float'
    }
  }
},{
    navigationOptions : globalSetting.navigationOptions,
    transitionConfig: TransitionConfiguration,
    
  }
)

// this is root navigator
const MineNavigator = createStackNavigator({
  Home: {
    screen: MainNavigator,
    navigationOptions: {
      headerTitle: 'LoginScreen',
      headerLeft: (<Text>smklfmlk</Text>)
    },
  },
  Login: { 
    screen: RegisterNaivgatot,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
},{
  navigationOptions : globalSetting.navigationOptions,
  headerMode: "none",
  mode: 'modal',
  gesturesEnabled: false
});

const app = dva({
  models: models,
  onError(e) {
  },
})

const App = app.start(<MineNavigator />)
export default App;
