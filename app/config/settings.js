/**
 * @providesModule GlobalSetting
 */

import colors from 'ThemeColors'

export default {
    navigationOptions : {
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },

    showTabLable : true, // 如果要隐藏 tab icon 下面的文字 设置为false设置为false
}