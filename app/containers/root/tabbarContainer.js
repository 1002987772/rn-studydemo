import React from 'react';
import { StyleSheet, Text,Button, Image, View } from 'react-native';
import {
  createBottomTabNavigator,
} from 'react-navigation';

/* config  */
import colors from 'ThemeColors'
import globalSetting from 'GlobalSetting'

/* screen  */
import HomeScreen from '../home/HomeScreen'
import SettingsScreen from '../setting/SettingsScreen'

/**
 * 配置 TabNavigation 
 */
const TabNavigator = createBottomTabNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:{
        tabBarIcon: ({focused,tintColor}) => (
                <Image
                    source={require('../../images/user-hp.png')}
                    style={{ width: 22 ,tintColor: tintColor }}
                    resizeMode="contain" 
                />
        ),
      }, 
    },
    Settings: {
      screen : SettingsScreen,
      navigationOptions:{
        tabBarIcon: ({focused,tintColor}) => (
                <Image
                    source={focused ? require('../../images/user-hp.png'):require('../../images/user-cool.png')}
                    style={{ width: 22 }}
                    resizeMode="contain" 
                />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style:{
        backgroundColor:'white',
      },
      activeTintColor: colors.primary,
      inactiveTintColor: 'gray',
      showLabel: globalSetting.showTabLable, // 如果要隐藏 tab icon 下面的文字 设置为false
    },
  }
);

/* change top navigation bar title */
TabNavigator.navigationOptions = ({ navigation }) => {
  
  let { routeName } = navigation.state.routes[navigation.state.index];
  // You can do whatever you like here to pick the title based on the route name
  let headerTitle = routeName;
  
  let headerRight =  (
    <Button
      onPress={() => {
        navigation.navigate('Login')
      }}
      title="login"
      color="#fff"
    />
  );

  let headerLeft =  (
    <Button
      onPress={() => alert('This is a button!')}
      title="Info"
      color="#fff"
    />
  );

  if (routeName === 'Home')
   return {
    headerLeft,
    headerTitle,
    headerRight,
   }
  return {
    headerTitle,
    headerRight,
  };
};


export default TabNavigator;
