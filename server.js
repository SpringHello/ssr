/**
 * Created by yunrui001 on 2018-06-15.
 */
const axios = require('axios')
//import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://ddd.xrcloud.net/ruicloud'
axios.withCredentials = true
const express = require('express')
//const proxy = require('express-http-proxy')
//const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const fs = require('fs')
const path = require('path')
const {createBundleRenderer} = require('vue-server-renderer')
//const api = require('./src/api')

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

//app.use('/user/GetUserInfo.do', proxy('https://pan.xrcloud.net'))

/*app.use('/user/GetUserInfo.do', proxy('https://pan.xrcloud.net', {
 forwardPath: function(req, res) {
 console.log('路径')
 console.log(require('url').parse(req.url).path)
 return require('url').parse(req.url).path;
 }
 }));*/
app.use(cookieParser());
//app.use('/ruicloud/user/GetUserInfo.do', proxy('ddd.xrcloud.net'));
/*app.all('*', proxy('https://pan.xrcloud.net', {
 proxyReqOptDecorator: function (req, res) {
 console.log(req)
 console.log(res)
 //req.headers['Cookies'] = 'Hm_lvt_e599c1b275dfa5d56291707ea11aaad3=1528696967,1528768780,1529401620,1529458271; Hm_lpvt_e599c1b275dfa5d56291707ea11aaad3=1529458271; XRCLOUDID=b71d9eb5-d47c-4e4a-8996-50b7bbf5cfb4'
 return req;
 }
 }))*/

/*app.use(session({
 secret: '12345',
 name: 'XRCLOUDID',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
 cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
 resave: false,
 saveUninitialized: true,
 }))*/
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token");
  res.header('Access-Control-Max-Age', '0');
  res.header('Server', 'Apache-Coyote/1.1')
  next();
})


app.get('/ruicloud/user/GetUserInfo.do', function (req, res) {
  let JSESSIONID = req.cookies.JSESSIONID
  axios.get('user/GetUserInfo.do', {
    headers: {
      Cookie: `JSESSIONID=${JSESSIONID}`
    }
  }).then(response => {
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.get('/ruicloud/information/zone.do', function (req, res) {
  let JSESSIONID = req.cookies.JSESSIONID
  axios.get('information/zone.do').then(response => {
    //console.log(response)
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.get('/ruicloud/document/getFirstTitle.do', function (req, res) {
  let JSESSIONID = req.cookies.JSESSIONID
  axios.get('document/getFirstTitle.do').then(response => {
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.get('/ruicloud/user/login.do', function (req, res) {
  axios.get('user/login.do', {
    params: {
      username: req.query.username,
      password: req.query.password,
      vailCode: req.query.vailCode
    }
  }).then(response => {
    console.log(response)
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.get('/ruicloud/document/getThirdTitle.do', function (req, res) {
  axios.get('document/getThirdTitle.do', {
    params: {
      id: req.query.id
    }
  }).then(response => {
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.get('/ruicloud/document/listInformation.do', function (req, res) {
  axios.get('document/listInformation.do', {
    params: {
      id: req.query.id
    }
  }).then(response => {
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.get('/ruicloud/document/listHotQuestion.do', function (req, res) {
  let JSESSIONID = req.cookies.JSESSIONID
  axios.get('document/listHotQuestion.do').then(response => {
    res.end(JSON.stringify(response.data))
  }, response => {

  })
})

app.use(express.static('./dist'))
// response
app.get('/ruicloud/*', function (req, res) {
  const context = {
    url: req.originalUrl,
    cookies: req.cookies
  }
  renderToString(context).then(resopnse => {
    res.set({
      'XDomainRequestAllowed': '1',
    })
    res.end(resopnse)
  }, error => {
    console.log(error)
  })
})

app.listen(80)





