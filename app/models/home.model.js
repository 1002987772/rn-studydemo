// import {Alert} from 'react-native'
import { getUserInfo } from '../api'

export default {
    namespace: 'home',
    state: { // 组件的initState
        name: 'lxc ',   
        userInfo: {},
        loading: false 
    },
    //recuder  同步修改state
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        setUser(state, {payload}) {
            return {...state, ...payload}
        }
    },
    //异步方法写在这里
    //  redux-sage
    //   https://redux-saga-in-chinese.js.org/docs/api/index.html  api文档
    effects: {
        // *getList(_, { call, put }) {
        //     try {
        //         yield put({type: 'save', payload: {loading: true}})  // put 相当于dispatch
        //         const { items } = yield call(getGoodsList)  //call 发送一个异步请求
        //         yield put({ type: 'save', payload: { list: items } })    
        //     } catch (error) {
        //         Alert.alert('错误', error.message)
        //     } finally{
        //         yield put({type: 'save', payload: {loading: false}})
        //     }
        // }


        *getInfo({payload = {}}, {call, put}){
            try{
                yield put({type: 'setUser', payload: {loading: true}})
                const data = yield call(getUserInfo)
                yield put({type: 'setUser', payload: { userInfo: data.data.guest} })   
                yield put({type: 'save', payload: { name: data.data.guest.name} })  
            }
            catch(error) {
                console.log(error)
            }
            finally {
                yield put({type: 'setUser', payload: {loading: false}}) 
            }
        }
    }
}