import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
// 打印控制台，跳过eslint
import consolelog from '@/axios/consolelog' // eslint-disable-line

Vue.use(vueAxios, axios)

/**
 * [http request 拦截器]
 * @return
 */
axios.interceptors.request.use(
  config => {
    // 判断localStorage中是否存在api_token
    if (localStorage.getItem('access_token')) {
      //  存在将access_token写入 request header
      config.headers = {
        'access-token': `${localStorage.getItem('access_token')}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * [返回状态判断(添加响应拦截器)]
 * code == 200时then，否则catch
 * @return
 */
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code !== 200) {
      return Promise.reject(response)
    }
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function errorState(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    toast(response.data.msg || '网络异常')
    return response.data
  } else {
    return {
      status: -404,
      msg: '网络异常'
    }
  }
}

function successState(res) {
  // 统一判断后端返回的错误码
  if (res.data && res.data.code === 200) {
    return true
  } else {
    toast(res.data.msg || res.data.message || '网络异常')
  }
}

/**
 * [toast 弹窗]
 * @param  {String} text     内容
 * @param  {Number} duration 延迟
 * @return
 */
function toast(text, duration) {
  let div = document.createElement('div')
  let txtCnt = ''

  if (toast.busy) return
  toast.busy = true
  duration = duration || 2800
  setTimeout(function() {
    toast.busy = false
  }, duration)

  if (typeof text === 'object') {
    text.forEach(item => {
      for (let key in item) {
        txtCnt += `<p class="toast-cnt-p">${item[key]}</p>`
      }
    })
  } else {
    txtCnt = text
  }

  Object.assign(div.style, {
    padding: '6px 12px',
    display: 'table',
    color: '#fff',
    fontSize: '13px',
    lineHeight: 1.6,
    position: 'fixed',
    top: '50%',
    margin: '-120px auto 0',
    left: '5%',
    right: 0,
    minWidth: '80px',
    maxWidth: '200px',
    textAlign: 'center',
    borderRadius: '5px',
    zIndex: 9999999,
    background: 'rgba(0,0,0,0.8)'
  })
  div.classList.add('toast')
  div.innerHTML = txtCnt
  document.body.appendChild(div)

  setTimeout(function() {
    div.parentNode && div.parentNode.removeChild(div)
  }, duration)
}

/**
 * [deployUse 添加公共参数, 先获取时间戳，保证每次生成token不一致]
 * @param  {Obj} data 参数
 *               data.auth_key [验证]
 *               data.token [token --> 参数 + token]
 *               data.timestamp [时间戳]
 * @return {Obj}
 */
function deployUse(data = {}) {
  let paraStr = ''

  data.timestamp = new Date().getTime()
  for (let value of Object.keys(data).sort()) {
    if (data[value] !== undefined && data[value] !== null) {
      paraStr += data[value].toString()
    }
  }
  data.auth_key = process.env.VUE_APP_AUTH_KEY
  data.token = paraStr + process.env.VUE_APP_TOKEN
  return data
}

/**
 * [配置axios]
 * @param  {Obj} opts 配置
 *               opts.method 请求方式 [*必填]
 *               opts.baseURL axios默认url
 *               opts.url 请求url [*必填]
 *               opts.headers 请求headers
 * @param  {Obj} data 请求数据
 * @return {Obj} res
 */
const timeout = 10 * 1000
const httpServer = (opts, data) => {
  // 设置默认headers
  let headers = {}

  switch (opts.method) {
    case 'post':
      headers = { 'X-Requested-With': 'XMLHttpRequest' }
      break
    case 'get':
      break
    case 'put':
      headers = { 'X-Requested-With': 'XMLHttpRequest' }
      break
    case 'delete':
      break
  }

  // http默认配置
  let httpDefaultOpts = {
    method: opts.method, // 必填
    baseURL: opts.baseURL || process.env.VUE_APP_API,
    url: opts.url, // 必填
    timeout: timeout,
    headers: Object.assign(headers, opts.headers)
  }

  if (opts.method === 'get') {
    httpDefaultOpts.params = deployUse(data)
  } else {
    httpDefaultOpts.data = deployUse(data)
  }

  let promise = new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then(res => {
        successState(res)
        resolve(res)
      })
      .catch(response => {
        errorState(response)
        reject(response)
      })
  })

  return promise
}

export default httpServer
