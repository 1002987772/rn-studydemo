
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import CategoryList from '../setting/CategoryList'

export default class ExpertScreen extends Component {   
  
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '专家团队',
    });

    constructor(props) {
        super(props)
    }

    render() {
        return  <CategoryList/>
        // <View style={{flex:1 , alignItems: 'center', justifyContent:'center', backgroundColor: '#fff'}}>
        //     <Text>专家团队</Text>
        // </View>
    }
}

const styles = StyleSheet.create({
    headerLeft: {
        color:"#fff"
    }
})

