import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'

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
      menuTitle: '',
      // 正文内容
      content: '',
      /*文档页面需要的数据END*/

      /*咨询页面需要的数据*/
      // 文章类型
      articleType: [],
      moreArticle: [],
      keywords: [],
      hot: [],
      /*咨询页面需要的数据END*/

      /*活动页面*/
      active: []
    },
    actions: {
      fetchItem ({commit, state}, {route, cookies}) {
        let config = {}
        if (cookies && cookies.XJSESSIONID) {
          config.headers = {
            Cookie: `XJSESSIONID=${cookies.XJSESSIONID}`
          }
        }
        let zoneList = http.get('information/zone.do')
        let userInfo = http.get('user/GetUserInfo.do', config)
        return Promise.all([userInfo, zoneList]).then(values => {
            //console.log(values[0])
            if (values[0].data.status == 1 && values[0].status == 200) {
              commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
            }
            if (values[1].data.status == 1 && values[1].status == 200) {
              commit('setZoneList', values[1].data.result)
            }
          },
          value => {
            console.log(value)
          })
      },
      // 文档模块action
      getFirstTitle ({commit, state}, {route, cookies}) {
        let hotQuestion = http.get('document/listHotQuestion.do')
        let first = http.get('document/getFirstTitle.do')
        return Promise.all([first, hotQuestion]).then(values => {
          commit('setFirstTitle', values[0])
          commit('setHotQuestion', values[1])
        })
      },
      getDocumentInfo({commit, state}, {route, cookies}) {
        let first = http.get('document/getFirstTitle.do')
        let menu = http.get('document/getThirdTitle.do', {
          params: {
            id: route.params.parentId
          }
        })
        let content = http.get('document/listInformation.do', {
          params: {
            id: route.params.id
          }
        })
        return Promise.all([first, menu, content]).then(values => {
          commit('setFirstTitle', values[0])
          commit('setMenuList', values[1])
          commit('setContent', values[2])
        })
      },
      // 资讯模块action
      getArticlePage({commit, state}, {route, cookies}){
        let articleType = http.get('article/getArticleType.do')
        let moreArticle = http.post('article/getMoreArticle.do', {
          articleTypeId: route.params.typeId,
          keywordVal: '',
          page: '1',
          pageSize: '5'
        })
        let keywords = http.get('article/getKeywords.do')
        let hot = http.get('article/getHotInformation.do', {
          params: {
            size: 4
          }
        })
        return Promise.all([articleType, moreArticle, keywords, hot]).then(values => {
          commit('setArticlePage', values)
        }, value => {
          console.log(value)
        })
      },
      getMoreArticle({commit, state}, typeId){
        http.post('article/getMoreArticle.do', {
          articleTypeId: typeId,
          page: '1',
          pageSize: '5'
        }).then(response => {
          state.moreArticle = response.data.result
        })
      },

      getActive({commit, state}, {route, cookies}){
        return http.get('activity/getActivitys.do').then(response => {
          state.active = response.data.result
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
        state.menuTitle = response.data.title
      },
      setHotQuestion(state, response){
        state.hotQuestion = response.data.result
      },
      setArticlePage(state, values){
        state.articleType = values[0].data.result
        state.moreArticle = values[1].data.result
        state.keywords = values[2].data.result
        state.hot = values[3].data.result
      }
    }
  })
}
