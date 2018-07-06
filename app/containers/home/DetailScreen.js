import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Icon,
    ART,
    Animated,
    Button
} from 'react-native'
import { ProgressCircle }  from 'react-native-svg-charts'
import { Svg, G, Path, Circle } from 'react-native-svg'
import CircleProgress from './TouchCircle'
import Echarts from 'native-echarts';

// const {Surface, Shape, Path} = ART;
let AnimatedPath = Animated.createAnimatedComponent(Path); 

let AnimatedCircle = Animated.createAnimatedComponent(Circle) 

export default class DetailScreen extends Component {
    static navigationOptions = {
        headerTitle: '进度条动画',
        headerBackTitle: 'BackTo',
        // headerLeft:(
        //     <Text style={{marginLeft:15, width:30, textAlign:"center"}} >
        //         返回　
        //     </Text>
        // )
      };

    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            lineFillAnimation: new Animated.Value(0), 
            circleFillAnimation: new Animated.Value(0) 
        }
        // 这里是动画的映射关系 
        this.lineAnimation = this.state.lineFillAnimation.interpolate({ 
            inputRange: [ 
                0, 100 
            ], 
            outputRange: [ 
                `M5 8 l0 0`, 
                `M5 8 l215 0`, 
            ] 
        }); 
        this.dasharray = [Math.PI * 2 * 42]; 
        this.circleAnimation = this.state.circleFillAnimation.interpolate({ 
            inputRange: [ 0, 100,], 
            outputRange: [ this.dasharray[0], 0] 
        }); 
    }

    startAnimation() { 
        // this.state.lineFillAnimation.setValue(0); 
        Animated.spring( 
            this.state.lineFillAnimation, 
            { 
                toValue: this.state.progress + 10, // 设置进度值,范围:0~100 
                friction: 7, // 动画摩擦力 
                tension: 35 // 动画张力 
            } 
        ).start(() => {
            
        });

        this.setState({
            progress: this.state.progress + 10
        })

        Animated.spring( 
            this.state.circleFillAnimation, 
            { 
                toValue: this.state.progress + 10, // 设置进度值,范围:0~100 
                friction: 7, // 动画摩擦力 
                tension: 35 // 动画张力 
            } 
        ).start(); 

    } 

    render() {
        return(
            <View style={styles.container}>
                <Svg height="21" width="225" style={{marginTop: -40}}> 
                    <G fill="none" stroke="#3d5875"> 
                        <Path strokeLinecap="round" strokeWidth="8" d="M5 8 l215 0" /> 
                    </G> 
                    <G fill="none" stroke="#00e0ff"> 
                        <AnimatedPath strokeLinecap="round" strokeWidth="8" d={this.lineAnimation}/> 
                    </G> 
                </Svg>
                <Svg height="100" width="100" style={{marginTop:40}}> 
                    <Circle cx="50" cy="50" r="42" stroke="#3d5875" strokeWidth="8" fill="transparent" /> 
                    <AnimatedCircle cx="50" cy="50" r="42" origin="50,50" stroke="#00e0ff" strokeWidth="8" strokeLinecap="round" fill="transparent" strokeDasharray={this.dasharray} strokeDashoffset={this.circleAnimation} /> 
                </Svg> 
                <Text style={styles.text} onPress={this.startAnimation.bind(this)}>add</Text>

               <View>
                    <CircleProgress width={300} height={300}/>
               </View>
            </View>        
        )}

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f00',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text: {
        color:'#000',
        fontSize: 20,
        marginTop: 40
    },
    btnContainer: {
        position:'absolute',
    }
})