import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import Home from '@/components/Home'
import Aboutus from '@/components/Aboutus'
import Document from '@/components/Document'
import DocumentInfo from '@/components/DocumentInfo'
import ActiveCenter from '@/components/ActiveCenter'
import Balance from '@/components/product/Balance'
import CloudDisk from '@/components/product/CloudDisk'
import CloudDiskBackup from '@/components/product/CloudDiskBackup'
import CloudMonitoring from '@/components/product/CloudMonitoring'
import DDOShighIP from '@/components/product/DDOShighIP'
import ECS from '@/components/product/ECS'
import EcsSnapshot from '@/components/product/EcsSnapshot'
import ElasticIP from '@/components/product/ElasticIP'
import Firewall from '@/components/product/Firewall'
import Host from '@/components/product/Host'
import NATgateway from '@/components/product/NATgateway'
import VirtualVPN from '@/components/product/VirtualVPN'
import VPC from '@/components/product/VPC'
import Login from '@/components/LR/Login'
import Register from '@/components/LR/Register'
import RegisterSuccess from '@/components/LR/RegisterSuccess'
import Reset from '@/components/LR/Reset'
import Art from '@/components/Article'


Vue.use(Router)

export default function () {
  return new Router({
    mode: 'history', // 注意这里要使用history模式，因为hash不会发送到服务端
    fallback: false,
    routes: [
      {
        path: '/ruicloud',
        name: App.name,
        component: App,
        children: [
          {path: '', component: Home},
          {path: 'home', name: Home.name, component: Home},
          {path: 'about', name: Aboutus.name, component: Aboutus},
          {path: 'article/:typeId', name: Art.name, component: Art},
          {path: 'document', name: Document.name, component: Document},
          {path: 'documentInfo/:parentId/:id', component: DocumentInfo},
          {path: 'activeCenter', name: ActiveCenter.name, component: ActiveCenter},
          {path: 'Pbalance', name: Balance.name, component: Balance},
          {path: 'PCloudDisk', name: CloudDisk.name, component: CloudDisk},
          {path: 'PCloudDiskBackup', name: CloudDiskBackup.name, component: CloudDiskBackup},
          {path: 'PCloudMonitoring', name: CloudMonitoring.name, component: CloudMonitoring},
          {path: 'PDDOShighIP', name: DDOShighIP.name, component: DDOShighIP},
          {path: 'PECS', name: ECS.name, component: ECS},
          {path: 'PEcsSnapshot', name: EcsSnapshot.name, component: EcsSnapshot},
          {path: 'PElasticIP', name: ElasticIP.name, component: ElasticIP},
          {path: 'PFirewall', name: Firewall.name, component: Firewall},
          {path: 'PHost', name: Host.name, component: Host},
          {path: 'PNATgateway', name: NATgateway.name, component: NATgateway},
          {path: 'PVirtualVPN', name: VirtualVPN.name, component: VirtualVPN},
          {path: 'PVPC', name: VPC.name, component: VPC},
          {path: 'login', name: 'login', component: Login},
          {path: 'register', name: 'register', component: Register},
          {path: 'reset', name: 'reset', component: Reset},
          {path: 'registerSuccess', name: 'registerSuccess', component: RegisterSuccess}
        ]
      }
    ]
  })
}
