import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'

export default class LoginScreen extends Component {   
  
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '登录',
        headerLeft:(
            <Text  onPress={()=>{navigation.pop()}} style={[styles.headerLeft,{marginLeft:10, width:30, textAlign:"center"}]} >
                取消
            </Text>
        )
    });

    constructor(props) {
        super(props)
    }

    gotoRegister(){
        this.props.navigation.navigate('Register')
    }

    render() {
        return <View style={{flex:1 , alignItems: 'center', justifyContent:'center', backgroundColor: '#fff'}}>
            <Text onPress={() => this.gotoRegister()}>登陆信息</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    headerLeft: {
        color:"#fff"
    }
})

