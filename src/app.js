// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'


import Main from './Main'
import createRouter from './router'
import createStore  from './store'
import md5 from 'md5'
import http from './util/http'
Vue.config.productionTip = false

export default function () {
  let router = createRouter()
  var store = createStore()

  //axios挂载到Vue原型
  Vue.prototype.$http = http

  let app = new Vue({
    router,
    store,
    render: h => h(Main),
  })
  return {app, router, store}
}

