import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { connect } from "react-redux";

@connect(({home}) => ({...home}))
export default class SettingsScreen extends React.Component {

    static navigationOptions = {
        title: 'Setting',
    };

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* other code from before here */}
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('PersonalTabbar')}
          />
          <Text>{this.props.name}</Text>
        </View>
      );
    }
  }
