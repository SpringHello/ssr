<template>
  <div id="documentInfo">
    <div id="left">
      <div id="head">
        <p>产品文档<img src="../assets/img/document/menu.png" style="float:right;cursor:pointer" ref="toggle"></p>
      </div>
      <div id="menu">
        <p>{{menuTitle}}</p>
        <div v-for="item in menuList" class="menu-item">
          <ul v-if="item.subMenu">
            <p :class="{active:item.active,open:item.title==openParentTitle}" @click="setOpenTitle(item.title)">
              {{item.title}}</p>
            <li v-for="i in item.subMenu" v-show="item.title == openParentTitle"
                :class="{active:i.id == $router.currentRoute.params.id}">
              <router-link :to="`/ruicloud/documentInfo/${$router.currentRoute.params.parentId}/${i.id}`">{{i.name}}
              </router-link>
            </li>
          </ul>
          <router-link v-else :to="`/ruicloud/documentInfo/${$router.currentRoute.params.parentId}/${item.parentId}`"
                       :class="{active:item.active}">
            {{item.title}}
          </router-link>
        </div>
      </div>
      <transition name="fade">
        <div id="main" v-if="mainOpen">
          <div v-for="item in firstTitle">
            <span>{{item.firstTitle}}</span>
            <ul>
              <li v-for="(i,index) in item.secondTitle" :key="index">
                <router-link :to="i.url">
                  {{i.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div id="right" v-html="content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    asyncData ({store, route, cookies}) {
      return store.dispatch('getDocumentInfo', {route, cookies})
    },
    data(){
      return {
        // 主导航开关
        mainOpen: false,
        openParentTitle: ''
      }
    },
    beforeRouteUpdate(to, from, next){
      this.$store.dispatch('getDocumentInfo', {route: to})
      next()
    },
    mounted(){
      document.addEventListener('click', event => {
        if (event.target != this.$refs.toggle) {
          this.mainOpen = false
        } else {
          this.mainOpen = !this.mainOpen
        }
      })
    },
    methods: {
      setOpenTitle(title){
        this.openParentTitle = this.openParentTitle == title ? '' : title
      }
    },
    computed: {
      firstTitle(){
        return this.$store.state.firstTitle
      },
      menuList(){
        this.$store.state.menuList.forEach(item => {
          item.active = false
          if (item.subMenu) {
            if (item.subMenu.some((i) => {
                return i.id == this.$router.currentRoute.params.id
              })) {
              this.openParentTitle = item.title
              item.active = true
            }
          } else {
            if (item.parentId == this.$router.currentRoute.params.id) {
              item.active = true
            }
          }
        })
        return this.$store.state.menuList
      },
      menuTitle(){
        return this.$store.state.menuTitle
      },
      content(){
        return this.$store.state.content
      }
    },
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #documentInfo {
    width: 1200px;
    margin: 0px auto;
    display: flex;
    #left {
      width: 300px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
      position: relative;
      #head {
        padding: 20px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 31px;
        border-bottom: 1px solid rgba(216, 216, 216, 1);
      }
      #menu {
        padding: 20px;
        > p {
          font-size: 18px;
          margin-bottom: 36px;
        }
        .menu-item {
          margin-bottom: 20px;
          font-size: 14px;
          .active {
            color: #2d8cf0;
          }
          > a {
            color: rgba(17, 17, 17, 0.82);
          }
          * {
            color: rgba(17, 17, 17, 0.82);
            cursor: pointer;
            user-select: none;
            &:hover {
              color: #2d8cf0;
            }
          }
          ul {
            p {
              font-size: 14px;
              &.open {
                &::after {
                  transform: rotate(-45deg) translateY(-3px);
                }
              }
              &.active {
                color: #2d8cf0
              }
              &::after {
                content: '';
                width: 10px;
                height: 10px;
                display: inline-block;
                border-bottom: 2px solid rgba(51, 51, 51, 1);
                border-left: 2px solid rgba(51, 51, 51, 1);
                transform: rotate(-135deg) translateY(-3px);
                float: right;
              }
            }
            li {
              margin-top: 10px;
              margin-left: 20px;
              &.active {
                a {
                  color: #2d8cf0
                }
              }
            }
          }
        }
      }
      #main {
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        top: 0px;
        left: 300px;
        width: 320px;
        //height: 550px;
        background-color: #f9f9f9;
        padding: 20px;
        > div {
          width: 140px;
          margin-bottom: 30px;
          > span {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
          ul {
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
            li {
              margin-top: 10px;
              a {
                color: #333333;
                &:hover {
                  color: #2d8cf0;
                }
              }
            }
          }
        }
      }
    }
    #right {
      width: 900px;
      padding: 20px;
    }
    #main {
      li {
        cursor: pointer;
        &:hover {
          color: #2d8cf0;
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
