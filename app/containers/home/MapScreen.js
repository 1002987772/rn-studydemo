import React, { Component, PropTypes } from 'react';
import { 
    requireNativeComponent,
    View,
    Text,
    NativeModules,
    NativeAppEventEmitter,
    StyleSheet,
    ScrollView,
    TouchableHighlight
 } from 'react-native';

var subscription;
var CalendarManager = NativeModules.CalendarManager;
var TestScrollView = requireNativeComponent('TestScrollView', TestScrollView);

var bannerImgs = [
    'http://upload-images.jianshu.io/upload_images/2321678-ba5bf97ec3462662.png?imageMogr2/auto-orient/strip%7CimageView2/2',
    'http://upload-images.jianshu.io/upload_images/1487291-2aec9e634117c24b.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/480/q/100',
    'http://f.hiphotos.baidu.com/zhidao/pic/item/e7cd7b899e510fb37a4f2df3db33c895d1430c7b.jpg'
  ];
  
// var TestScrollViewConsts = require('react-native').UIManager.TestScrollView.Constants;

class CustomButton extends React.Component {
    render() {
      return (
        <TouchableHighlight
          style={{padding: 8, backgroundColor:this.props.backgroundColor}}
          underlayColor="#a5a5a5"
          onPress={this.props.onPress}>
          <Text>{this.props.text}</Text>
        </TouchableHighlight>
      );
    }
  }

export default class MapView extends Component {
    constructor(props){
        super(props);

    }

  render() {
    return (
        <View>
            <CustomButton text="调用testNormalEvent方法-普通"
            backgroundColor= "#FF0000"
            onPress={()=>CalendarManager.testNormalEvent('调用testNormalEvent方法', '测试普通调用')}
           />
            <Text>wmoklkmlkl</Text>

            <View>
                <TestScrollView style={styles.container} 
                    autoScrollTimeInterval = {2}
                    imageURLStringsGroup = {bannerImgs}
                    // pageControlAliment = {TestScrollViewConsts.SDCycleScrollViewPageContolAliment.right}
                    />
                <Text style={{fontSize: 15, margin: 10, textAlign:'center'}}>
                    点击banner -> 29929
                </Text>
             </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container:{
      padding:30,
      borderColor:'#e7e7e7',
      marginTop:10,
      height:200,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });