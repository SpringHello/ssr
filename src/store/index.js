import Vue from 'vue'
import Vuex from 'vuex'
import http from '../util/http'

Vue.use(Vuex)

export default function () {
  return new Vuex.Store({
    state: {
      userInfo: null,
      authInfo: null,
      // 区域信息
      zoneList: null,
      // 当前区域
      zone: null,
    },
    actions: {
      fetchItem ({commit, state}, {route, cookies}) {
        let zoneList = http.get('information/zone.do', {
          headers: {
            Cookie: `JSESSIONID=${cookies.JSESSIONID}`
          }
        })
        let userInfo = http.get('user/GetUserInfo.do', {
          headers: {
            Cookie: `JSESSIONID=${cookies.JSESSIONID}`
          }
        })
        return Promise.all([userInfo, zoneList]).then(values => {
            if (values[0].data.status == 1 && values[0].status == 200) {
              commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
            }
            if (values[1].data.status == 1 && values[1].status == 200) {
              commit('setZoneList', values[1].data.result)
            }
          },
          value => {
          })
      },
      login ({commit}, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return http.get('user/login.do', {
          params: {
            username: 'sdf',
            password: 'asdf'
          }
        }).then(response => {
          commit('setItem', response.data)
        })
      }
    },
    mutations: {
      setAuthInfo (state, {authInfo, userInfo}) {
        state.authInfo = authInfo
        state.userInfo = userInfo
      },
      setZoneList (state, zoneList) {
        state.zoneList = zoneList
        // 设置当前默认区域
        for (var zone of zoneList) {
          if (zone.isdefault == 1) {
            state.zone = zone
          }
        }
      }
    }
  })
}
