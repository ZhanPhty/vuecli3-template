import axiosApi from '@/axios/config'

/**
 * post 请求
 * @param {String} url 接口url
 * @param {Obj} params 参数
 * @param {Fn} cb 回调函数
 * @return
 */
export const post = (url, params) => {
  return axiosApi.httpServer(
    {
      url: url,
      method: 'post'
    },
    params
  )
}

/**
 * put 请求
 * @param {String} url 接口url
 * @param {Obj} params 参数
 * @param {Fn} cb 回调函数
 * @return
 */
export const put = (url, params) => {
  return axiosApi.httpServer(
    {
      url: url,
      method: 'put'
    },
    params
  )
}

/**
 * get 请求
 * @param {String} url 接口url
 * @param {Obj} params 参数
 * @param {Fn} cb 回调函数
 * @return
 */
export const get = (url, params) => {
  return axiosApi.httpServer(
    {
      url: url,
      method: 'get'
    },
    params
  )
}

/**
 * delete 请求
 * @param {String} url 接口url
 * @param {Obj} params 参数
 * @param {Fn} cb 回调函数
 * @return
 */
export const del = (url, params) => {
  return axiosApi.httpServer(
    {
      url: url,
      method: 'delete'
    },
    params
  )
}
