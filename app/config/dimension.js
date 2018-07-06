/**
 * @providesModule Dimension
 */

import {
    Dimensions
} from 'react-native';

export default {
    screenWidth : Dimensions.get('window').width,
    screenHeight : Dimensions.get('window').height,
    navigationBarHeight: (Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812) ? 88 : 375
}