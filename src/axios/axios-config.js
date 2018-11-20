import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import vueAxios from 'vue-axios'

// 打印控制台，跳过eslint
import consolelog from '@/axios/api/consolelog' // eslint-disable-line

Vue.use(vueAxios, axios)

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 若是有做鉴权token , 就给头部带上token
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // if (store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function errorState(response) {
  //隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  } else {
    console.log('网络异常')
  }
}

function successState(res) {
  console.log(res)
  // 统一判断后端返回的错误码
  // if (res.data.errCode === '10000') {
  // }
}

// 配置axios
const httpServer = (opts, data) => {
  // 设置默认headers
  let headers =
    opts.method === 'get'
      ? {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      : {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }

  // 公共参数
  let publicParams = {}

  // http默认配置
  let httpDefaultOpts = {
    method: opts.method, // 必填
    baseURL: opts.baseURL || process.env.VUE_APP_API, // 必填
    url: opts.url, // 必填
    timeout: 20 * 1000,
    params: Object.assign(publicParams, data),
    data: qs.stringify(Object.assign(publicParams, data)),
    headers: Object.assign(headers, opts.headers)
  }

  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
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
