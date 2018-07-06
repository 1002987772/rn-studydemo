import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { connect } from 'react-redux';
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
    this.props.dispatch({type: 'home/save', payload:{name: 'luoxingchen'}})
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Circle Animation0"
          onPress={
            () => this.props.navigation.navigate('Circle')
          }
        />
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
        <Button title="changeName" onPress={this.changeName}/>
        <Text>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

