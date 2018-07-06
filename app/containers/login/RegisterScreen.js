import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'

export default class LoginScreen extends Component {   
  
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '注册',
    });

    constructor(props) {
        super(props)
    }

    render() {
        return <View style={{flex:1 , alignItems: 'center', justifyContent:'center', backgroundColor: '#fff'}}>
            <Text>注册信息</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    headerLeft: {
        color:"#fff"
    }
})

