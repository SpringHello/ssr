/**
 * Created by yunrui001 on 2018-06-15.
 */
//const axios = require('axios')
//import qs from 'qs'
// axios 配置
//axios.defaults.timeout = 5000
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//axios.defaults.baseURL = 'http://ddd.xrcloud.net/ruicloud/'
//axios.withCredentials = true
const express = require('express')
const app = express()
/*var proxyMiddleWare = require("http-proxy-middleware")
var proxyPath = "http://pan.xrcloud.net"
var proxyOption = {target: proxyPath, changeOrigoin: true}
app.use(/.*\.do$/, proxyMiddleWare(proxyOption))*/
//const proxy = require('express-http-proxy')
//const session = require('express-session')
const cookieParser = require('cookie-parser')


const fs = require('fs')
const path = require('path')
const {createBundleRenderer} = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)

// 生成服务端渲染函数
const renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  // 推荐
  runInNewContext: false,
  // 模板html文件
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  // client manifest
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}
app.use(express.static('./dist'))
app.use(cookieParser());

// response
app.get('/ruicloud/*', function (req, res) {
  const context = {
    url: req.originalUrl,
    cookies: req.cookies
  }
  renderToString(context).then(resopnse => {
    res.end(resopnse)
  }, error => {
    console.log(error)
  })
})

app.listen(80)





