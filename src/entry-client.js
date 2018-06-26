/**
 * Created by yunrui001 on 2018-06-15.
 */
import Vue from 'vue'
import createApp from './app'
import './assets/style/reset.css'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
// 引入轮播组件
import carousel from './myView/carousel'
import carouselItem from './myView/carouselItem'
Vue.use(iview)
// 使用轮播组件
Vue.use(carousel)
Vue.use(carouselItem)
const {
  app,
  router,
  store
} = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// 因为可能存在异步组件，所以等待router将所有异步组件加载完毕，服务器端配置也需要此操作
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })
  app.$mount('#app')
})
