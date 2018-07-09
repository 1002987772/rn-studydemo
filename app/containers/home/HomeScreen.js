import React from 'react';
import { StyleSheet, Text, Button, View, NativeModules,requireNativeComponent } from 'react-native';
import { connect } from 'react-redux';

var Push = NativeModules.PushNative;
// var CWCarouselView = NativeModules.CWCarouselView;

var CWCarouselView = requireNativeComponent('CWCarouselView', CWCarouselView);

/**
 * 链接react-redux
 */
@connect(({home}) => ({...home}))
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Home',
  };
  changeName  = () =>{
    // 发送action  type必须写  {namespace}/ functionName
    // this.props.dispatch({type: 'home/save', payload:{name: 'luoxingchen'}})
    
    this.props.dispatch({type: 'home/getInfo', payload:{userInfo: ''}})
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        {/* <Button
          title="Circle Animation0"
          onPress={
            () => this.props.navigation.navigate('Circle')
          }
        /> */}
        <Button
          title="Circle Animation1"
          onPress={
            () => this.props.navigation.navigate('Details')
          }
        />
        <Button
          title="Charts"
          onPress={
            () => this.props.navigation.navigate('Charts')
          }
        />
        <Button
          title="MapView93939"
          onPress={
            () => this.props.navigation.navigate('Map')
          }
        />
        <Button
          title="NativePush"
          onPress={
            () => {
              Push.RNOpenOneVC('测试')
            }
          }
        />
        <Button title="changeName" onPress={this.changeName}/>
        <Text>
          {this.props.name}
        </Text>
        <CWCarouselView
          style={styles.container} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: 375,
    borderColor:'#e7e7e7',
    marginTop:10,
    height:100,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});