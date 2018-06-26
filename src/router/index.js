import Vue from 'vue'
import Router from 'vue-router'
import App1 from '@/components/App1'
import Home from '@/components/Home'
import Aboutus from '@/components/Aboutus'
import Document from '@/components/Document'
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
          {path: 'Aboutus', name: Aboutus.name, component: Aboutus},
          {path: 'Document', name: Document.name, component: Document},
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
          {path: 'PVPC', name: VPC.name, component: VPC}
        ]
      }
    ]
  })
}
