import CardStackStyleInterpolator from 
                    'react-navigation/src/views/StackView/StackViewStyleInterpolator'

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {

        const {scene} = sceneProps;
        const {route} = scene;
        // 获取屏幕切换时新屏幕的参数
        const params = route.params || {};
        // 看看参数中是否有 transition 参数，有则使用，否则使用缺省值 forHorizontal
        // forHorizontal 表示从右向左滑出
        // { transition: 'forVertical' }
        const transition = params.transition || 'forHorizontal';
    
        console.log(transition)

        return CardStackStyleInterpolator[transition](sceneProps);
    },
})

export default TransitionConfiguration