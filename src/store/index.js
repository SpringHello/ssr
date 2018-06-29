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

      /*文档页面需要的数据*/
      // 主导航
      firstTitle: [],
      // 热点问题
      hotQuestion: [],
      // 二级导航
      menuList: [],
      // 正文内容
      content: '',
      /*文档页面需要的数据END*/

      /*咨询页面需要的数据*/
      // 文章类型
      articleType: [],
      /*咨询页面需要的数据END*/

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
      getFirstTitle ({commit, state}, {route, cookies}) {
        let hotQuestion = http.get('document/listHotQuestion.do')
        let first = http.get('document/getFirstTitle.do')
        return Promise.all([first, hotQuestion]).then(values => {
          commit('setFirstTitle', values[0])
          commit('setHotQuestion', values[1])
        })
      },
      getDocumentInfo({commit, state}, {route, cookies}) {
        let first = http.get('http://xxx.xrcloud.net/ruicloud/document/getFirstTitle.do')
        let menu = http.get('http://xxx.xrcloud.net/ruicloud/document/getThirdTitle.do', {
          params: {
            id: route.params.parentId
          }
        })
        let content = http.get('http://xxx.xrcloud.net/ruicloud/document/listInformation.do', {
          params: {
            id: route.params.id
          }
        })
        return Promise.all([first, menu, content]).then(values => {
          console.log(values)
          commit('setFirstTitle', values[0])
          commit('setMenuList', values[1])
          commit('setContent', values[2])
        })
      },
      getArticleType({commit, state}, {route, cookies}){
        http.get('article/getArticleType.do').then(response => {
          console.log(response)
          commit('setArticleType', response)
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
      },
      setFirstTitle (state, response) {
        state.firstTitle = response.data.result
      },
      setContent (state, response) {
        state.content = response.data.result[0].content.replace(/<img src="/g, '<img src="http://jk.xrcloud.net/')
      },
      setMenuList (state, response) {
        state.menuList = response.data.result
      },
      setHotQuestion(state, response){
        state.hotQuestion = response.data.result
      },
      setArticleType(state, response){
        state.articleType = response.data.result
      }
    }
  })
}
