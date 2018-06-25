import Vue from 'vue'
import Router from 'vue-router'
import App1 from '@/components/App1'
import Home from '@/components/Home'
import ActiveCenter from '@/components/ActiveCenter'

Vue.use(Router)

export default function () {
  return new Router({
    mode: 'history', // 注意这里要使用history模式，因为hash不会发送到服务端
    fallback: false,
    routes: [
      {
        path: '/ruicloud',
        name: App1.name,
        component: App1,
        children: [
          {path: 'home', name: Home.name, component: Home},
          {path: 'activeCenter', name: ActiveCenter.name, component: ActiveCenter}
        ]
      },
    ]
  })
}
