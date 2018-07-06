import React from 'react';
import { StyleSheet, Text,Button, Image, View } from 'react-native';
import {
  createMaterialTopTabNavigator
} from 'react-navigation';

/* screen  */
import PersonalScreen from './person'
import ExpertScreen from './expert'

const styles = StyleSheet.create({
  label: {
    color: '#000',
    backgroundColor: '#000'
  }
})
/**
 * 配置 TabNavigation 
 */
const mineBar = createMaterialTopTabNavigator(
  {
    Person:{
      screen:PersonalScreen,
      navigationOptions: {
        title:'私人团队',
      }
    },
    Expert: {
      screen : ExpertScreen,
      navigationOptions: {
        title:'专家团队',
      }
    },
  },
  {
    tabBarOptions: {
      style:{
        backgroundColor:'white',
      },
      showLabel: true, // 如果要隐藏 tab icon 下面的文字 设置为false
      activeTintColor: '#000',
      inactiveTintColor: '#000',
      // tabStyle:styles.label
      indicatorStyle:{
        backgroundColor:'#000'
      }
    },
    tabBarPosition: 'top',
    swipeEnabled: true,
  }
);

/* change top navigation bar title */
mineBar.navigationOptions = ({ navigation }) => {
  
};



export default mineBar;
