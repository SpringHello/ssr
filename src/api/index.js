/**
 * Created by yunrui001 on 2018-06-20.
 */
const axios = require('axios')
//import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'https://pan.xrcloud.net'


function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
exports = {
  /**
   * 获取广告信息
   * */
  GetUserInfo (params) {
    return fetch('/user/GetUserInfo.do', params)
  },
  getAreas (params) {
    return fetch('/api/area/getAll', params)
  }
}
