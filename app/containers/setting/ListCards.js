import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ListView
} from 'react-native';

const Line_Height = 30
 
class ListCards extends Component {
  constructor(props) {
    super(props);
    this.state={
       ...props,
       showAnim:new Animated.Value(0),
       numArr: [0,1, 2,]
     };
     this.showorhide=0;
      }

  _getListItems(text) {
      return <Text style={{alignSelf:'center'}}>text</Text>
  }
 
  _showorhideItems(){
    if(typeof(this.state.name)=='undefined'||this.state.name==null){
      return;
    }
    Animated.timing(          // Uses easing functions
       this.state.showAnim,    // The value to drive
       {
         duration:300,
         toValue: this.showorhide==0?1:0
       }            // Configuration
     ).start();
     this.showorhide=this.showorhide==0?1:0;
  }
 
 
  render(){
    return(
      <View>
        <TouchableOpacity onPress={this._showorhideItems.bind(this)}>
            <View style={styles.headerLine}>
                <View style={styles.headerRows}><Text>{this.state.name}</Text></View>
            </View>
        </TouchableOpacity>

        <Animated.View
         style={{
           height:this.state.showAnim.interpolate({
             inputRange: [0, 1],
             outputRange: [0, Line_Height * this.state.numArr.length]
           }),
           overflow:'hidden',
           backgroundColor: '#f00'
         }
        }
        >
            {/* <View style={styles.showitemContain}>
                <View style={{height:50}}>
                    <Text>{this.state.title==null?'':this.state.title}</Text>
                </View>
                <View style={{height:60}}>
                    <Text>{this.state.fromwhere==null?'':this.state.fromwhere}</Text>
                </View>
            </View> */}
            {/* <ListView dataSource={this.state.numArr}
                renderRow={(rowData) =>this._getListItems(11)}>
            </ListView> */}
            {this.state.numArr.map((item, index) => {
              return <Text>8388</Text>
            })}
        </Animated.View>
      </View>
    )
  }
}
 
const styles=StyleSheet.create({
  headerLine:{
    height:50,
    flexDirection:'row',
    // borderBottomWidth:1,
    // borderBottomColor:'red',
  },
  headerRows:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  showitemContain:{
    // borderWidth:1,
    // borderColor:'red',
    height:110,
    justifyContent:'center',
    alignItems:'center',
  }
 
});
 
module.exports=ListCards;
