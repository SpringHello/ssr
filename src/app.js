// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Main from './Main'
import createRouter from './router'
import createStore  from './store'

//import './assets/style/reset.css'

Vue.config.productionTip = false

export default function () {
  let router = createRouter()
  let store = createStore()
  let app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main),
  })
  return {app, router, store}
}

