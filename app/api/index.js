/**
 created by 杨小北
 */

import HttpUtils from './Http'

export function getMoviesFromApiAsync () {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      // throw new Error(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject('19199199')
    });
}

export function getDataInfo () {
  let orderTime = 'http://leseauxevent.chanel.com.cn/les-register/register/orderTime'

  HttpUtils.post(orderTime, { city: 'Beijing', type: 0, })
    .then((data) => data)
    .catch((error) => error)
}

export function getData () {
  HttpUtils.get('https://facebook.github.io/react-native/movies.json')
}

export  function getUserInfo (discernStr) {
  return HttpUtils.post('http://cocogamecenter.chanel.cn/coco-game-center/confirm/info', {discern: "55462FB3403E815B359DABC3B756507B"})
}