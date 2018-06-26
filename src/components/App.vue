<template>
  <div id="font">
    <header>
      <div id="menu-wrapper">
        <router-link to="/ruicloud/home" id="logo">
          <img src="../assets/img/app/logo.png">
        </router-link>
        <div id="operate" @mouseleave="ML">
          <ul>
            <li v-for="(item,index) in titleItem" :key="index" @mouseenter="ME($event,index)">
              <router-link :to="item.path"><span>{{item.title}}</span></router-link>
            </li>
          </ul>
          <ul v-if="userInfo">
            <li @mouseenter="ME">
              <a href="//ddd.xrcloud.net/ruicloud/overview" target="_self"><span>控制台</span></a>
            </li>
            <li @mouseenter="ME">
              <a href="//ddd.xrcloud.net/ruicloud/userCenter" target="_self"><span style="border-right: none">{{userInfo.realname}}</span></a>
            </li>
          </ul>
          <ul v-else>
            <li @mouseenter="ME">
              <router-link to="register"><span>注册</span></router-link>
            </li>
            <li @mouseenter="ME">
              <router-link to="login"><span style="border-right: none">登录</span></router-link>
            </li>
          </ul>
          <div id="bar" :style="barStyle"></div>
        </div>
      </div>
    </header>
    <div id="common-topbar-dropdown" @mouseenter="MED" @mouseleave="MLD">
      <div v-for="(item,index) in titleItem" v-if="item.content" class="common-topbar-dropdown-inner"
           :class="{active:index==current}">
        <div class="common-topbar-dropdown-category-container">
          <div class="category-item" v-for="prod in item.content">
            <h2>{{prod.prod}}</h2>
            <ul>
              <li v-for="prodItem in prod.prodItem">
                <router-link :to="prodItem.path">{{prodItem.title}}</router-link>
                <p>{{prodItem.desc}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import http from '../util/http'
import debounce from 'throttle-debounce/debounce'
export default {
  name: 'App',
  asyncData ({ store, route, cookies }) {
    return store.dispatch('fetchItem', { route, cookies })
  },
  data () {
    return {
      /*banner 数据*/
      titleItem: [
        {
          title: '活动中心',
          path: '/ruicloud/ActiveCenter',
          hot: true
        },
        {
          title: '首页',
          path: '/ruicloud/home'
        },
        {
          title: '产品',
          path: '',
          content: [
            {
              prod: '云计算',
              prodItem: [
                { title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: '/ruicloud/Pecs' },
                { title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: '/ruicloud/Phost' },
                { title: 'ECS快照', desc: '稳定可靠、安全保障', path: '/ruicloud/Pecss' },
                { title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: '' },
                { title: '弹性伸缩（敬请期待）', desc: '高可用、可视化、低成本', path: '' }
              ]
            },
            {
              prod: '云网络',
              prodItem: [
                { title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: '/ruicloud/Pvpc' },
                { title: '弹性IP', desc: '绑定与解绑IP、扩容', path: '/ruicloud/Peip' },
                { title: '负载均衡', desc: '源算法、轮询、最小连接数', path: '/ruicloud/Pbalance' },
                { title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: '/ruicloud/Pnat' },
                { title: '虚拟专网VPN', desc: '跨VPC链接', path: '/ruicloud/Pvirvpn' },
                { title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: '' }
              ]
            },
            {
              prod: '云存储',
              prodItem: [
                { title: '云硬盘', desc: '性能型、超高性能型、存储型', path: '/ruicloud/Pdisk' },
                { title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: '/ruicloud/Pbackupdisk' }
              ]
            },
            {
              prod: '云安全',
              prodItem: [
                { title: '防火墙', desc: '自定义规则、协议、端口', path: '/ruicloud/Pfirewall' },
                { title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: '/ruicloud/Pddos' }
              ]
            },
            {
              prod: '云运维',
              prodItem: [
                { title: '云监控', desc: '自定义监控项、多告警推送方式', path: '/ruicloud/Pmonitor' },
                { title: '访问控制（敬请期待）', desc: '权限管理、精准控制', path: '' }
              ]
            }
          ]
        },
        {
          title: '文档',
          path: '/ruicloud/document'
        },
        {
          title: '关于我们',
          path: '/ruicloud/about'
        },
        {
          title: '备案',
          path: '/ruicloud/entrance'
        }
      ],
      /*bar 样式对象*/
      barStyle: {
        width: '0px',
        left: '0px',
        transition: 'width .3s'
      },
      // 指代当前li下标，主要用于dropDown
      current: -1,
      static: false
    }
  },
  methods: {
    ME: debounce(200, function (event, index) {
      this.barStyle.width === '0px' ? this.barStyle.transition = 'width .3s'
        : this.barStyle.transition = 'all .3s'
      this.barStyle.width = `${event.target.clientWidth}px`
      this.barStyle.left = `${event.target.offsetLeft}px`
      this.current = index
    }),
    ML: debounce(200, function () {
      if (!this.static) {
        this.current = -1
        this.barStyle.width = '0px'
      }
    }),
    MED () {
      this.static = true
    },
    MLD () {
      this.static = false
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#font {
  header {
    background-color: #495060;
    #menu-wrapper {
      width: 1200px;
      height: 60px;
      margin: 0px auto;
      #logo {
        float: left;
        display: block;
        margin-top: 20px;
        margin-left: 5px;
        width: 80px;
        img {
          width: 100%;
        }
      }
      #operate {
        height: 100%;
        display: inline-block;
        float: right;
        font-size: 0px;
        position: relative;
        ul {
          display: inline-block;
          li {
            height: 60px;
            line-height: 60px;
            display: inline-block;
            a {
              font-size: 14px;
              color: #fff;
              display: inline-block;
              height: 100%;
              span {
                padding: 0px 20px;
              }
              //line-height: 100%;
            }
            &:last-of-type {
              a {
                span {
                  border-right: 1px solid #fff;
                }
              }
            }
          }
        }
        // 指示条样式
        #bar {
          height: 2px;
          background-color: #377dff;
          position: absolute;
          bottom: 0px;
        }
      }
    }
  }

  #common-topbar-dropdown {
    opacity: 0.96;
    background-color: #333;
    .common-topbar-dropdown-inner {
      width: 1200px;
      margin: 0px auto;
      height: 0px;
      overflow: hidden;
      animation: height 0.3s;
      &.active {
        height: unset;
      }
      .common-topbar-dropdown-category-container {
        display: flex;
        justify-content: space-between;
        padding: 26px 0;
        .category-item {
          width: 15%;
          h2 {
            font-size: 18px;
            color: #fff;
            line-height: 32px;
            font-weight: 400;
            border-bottom: 1px solid hsla(0, 0%, 100%, 0.35);
            padding-bottom: 10px;
          }
          ul {
            li {
              a {
                margin-top: 10px;
                display: inline-block;
                font-size: 14px;
                color: #fff;
                line-height: 25px;
                &:hover {
                  color: #2d8cf0;
                }
              }
              p {
                font-size: 12px;
                color: #999;
                line-height: 21px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
