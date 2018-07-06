import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Platform, Text } from 'react-native';
import {Svg, Circle, Path } from 'react-native-svg';
export default class CircleView extends Component {

    static defaultProps = {
        width: 300,
        height: 300,
        r: 100,
        angle: 0,
        outArcColor: 'white',
        strokeWidth: 10,
        value: 20,
        min: 10,
        max: 70,
        progressvalue: '#ED8D1B',
        tabR: 15,
        tabColor: '#EFE526',
        tabStrokeWidth: 5,
        tabStrokeColor: '#86BA38',
        valueChange: () => {},
        complete: () => {},
        renderCenterView: () => {},
        step: 1,
        enTouch: true,
     };

    constructor(props) {
        super(props);
        this.state = {
            temp: this.props.value,
        };
        this.iniPanResponder();
    }

    iniPanResponder() {
        this.parseToDeg = this.parseToDeg.bind(this);
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: evt => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
            if (this.props.enTouch) {
                this.lastTemper = this.state.temp;
                const x = evt.nativeEvent.locationX;
                const y = evt.nativeEvent.locationY;
                this.parseToDeg(x, y);
            }
            },
            onPanResponderMove: (evt, gestureState) => {
            if (this.props.enTouch) {
                let x = evt.nativeEvent.locationX;
                let y = evt.nativeEvent.locationY;
                if (Platform.OS === 'android') {
                    x = evt.nativeEvent.locationX + gestureState.dx;
                    y = evt.nativeEvent.locationY + gestureState.dy;
                }
                this.parseToDeg(x, y);
            }
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: () => {
                if (this.props.enTouch) this.props.complete(this.state.temp);
            },
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            onPanResponderTerminate: () => {},
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            onShouldBlockNativeResponder: () => true,
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.state.temp) {
            this.state = {
                temp: nextProps.value,
            };
        }
    }

    parseToDeg(x, y) {
        const cx = this.props.width / 2;
        const cy = this.props.height / 2;
        let deg;
        let temp;
       
        if (x >= cx && y <= cy) {
            deg = Math.atan((cy - y) / (x - cx)) * 180 / Math.PI;
            temp = (270 - deg - this.props.angle / 2) / (360 - this.props.angle) *
            (this.props.max - this.props.min) + this.props.min;
        } 
        else if (x >= cx && y >= cy) {
            deg = Math.atan((cy - y) / (cx - x)) * 180 / Math.PI;
            temp = (270 + deg - this.props.angle / 2) / (360 - this.props.angle) *
            (this.props.max - this.props.min) + this.props.min;
        } 
        else if (x <= cx && y <= cy) {
            deg = Math.atan((x - cx) / (y - cy)) * 180 / Math.PI;
            temp = (180 - this.props.angle / 2 - deg) / (360 - this.props.angle) *
            (this.props.max - this.props.min) + this.props.min;
        } 
        else if (x <= cx && y >= cy) {
            deg = Math.atan((cx - x) / (y - cy)) * 180 / Math.PI;
            if (deg < this.props.angle / 2) {
                deg = this.props.angle / 2;
            }
            temp = (deg - this.props.angle / 2) / (360 - this.props.angle) *
                    (this.props.max - this.props.min) + this.props.min;
        }

        if (temp <= this.props.min) {
            temp = this.props.min;
        }
        if (temp >= this.props.max) {
            temp = this.props.max;
        }
        temp = this.getTemps(temp);
        
        // if (Math.abs(temp - this.state.temp) > 10)
        //     return

        this.setState({
            temp,
        });
        this.props.valueChange(this.state.temp);
    }

    getTemps(tmps) {
        const k = parseInt((tmps - this.props.min) / this.props.step, 10);
        const k1 = this.props.min + this.props.step * k;
        const k2 = this.props.min + this.props.step * (k + 1);
        if (Math.abs(k1 - tmps) > Math.abs(k2 - tmps)) return k2;
        return k1;
    }

    render() {
        return (
            <View pointerEvents={'box-none'}>
                {this._renderCircleSvg()}
                {/* <View style={{ position: 'relative', top: -this.props.height / 2 - this.props.r, left: this.props.width / 2 - this.props.r, flex: 1, }}>
                            {this.props.renderCenterView(this.state.temp)}
                </View> */}
            </View>
        );
    }

    _circlerate() {
        let rate = parseInt(
            (this.state.temp - this.props.min) * 100 / (this.props.max - this.props.min), 10
        );
        if (rate < 0) {
            rate = 0;
        } else if (rate > 100) {
            rate = 100;
        }
        return rate;
    }

    _renderCircleSvg() {
        const cx = this.props.width / 2;
        const cy = this.props.height / 2;
        const prad = this.props.angle / 2 * (Math.PI / 180);
        // const startX = -(Math.sin(prad) * this.props.r) + cx;
        const startX = -(Math.sin(prad) * this.props.r) + cx;
        const startY = cy + Math.cos(prad) * this.props.r; // // 最外层的圆弧配置
        // const endX = Math.sin(prad) * this.props.r + cx;
        // const endY = cy + Math.cos(prad) * this.props.r;
        const endX = Math.sin(prad) * this.props.r + cx;
        const endY = cy + Math.cos(prad) * this.props.r;

        // 计算进度点
        const progress = parseInt(
            this._circlerate() * (360 - this.props.angle) / 100,
            10
        );

        console.log(this._circlerate() * (360 - this.props.angle) / 100)

        // 根据象限做处理 苦苦苦 高中数学全忘了，参考辅助线
        const t = progress + this.props.angle / 2;
        const progressX = cx - Math.sin(t * (Math.PI / 180)) * this.props.r;
        const progressY = cy + Math.cos(t * (Math.PI / 180)) * this.props.r;
        const descriptions = [
        'M', startX, startY, 'A', this.props.r, this.props.r, 0, 1, 1, startX + 0.01, endY,
        ].join(' ');

        // console.log(startX, startY) 

        const progressdescription = [ 'M', startX, startY, 'A', this.props.r, this.props.r, 0, t >= 180 + this.props.angle / 2 ? 1 : 0, 1, progressX, progressY,
        ].join(' ');

        return (
            <Svg height={this.props.height} width={this.props.width} style={styles.svg}>
                <Path d={descriptions} fill="none" stroke={this.props.outArcColor} strokeWidth={this.props.strokeWidth} />
                <Path d={progressdescription} fill="none" stroke={this.props.progressvalue} strokeWidth={this.props.strokeWidth} />
                <Circle  {...this._panResponder.panHandlers} cx={progressX} cy={progressY} r={this.props.tabR} stroke={this.props.tabStrokeColor} strokeWidth={this.props.tabStrokeWidth} fill={this.props.tabColor} />
            </Svg>
        );
    }
}
const styles = StyleSheet.create({
 svg: {},
});