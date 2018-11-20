import axiosApi from '@/axios/axios-config'

export default {
  /**
   * 通用post请求
   * @param {String} url 接口url
   * @param {String} method 请求方式
   * @param {Obj} params 参数
   * @param {Fn} cb 回调函数
   * @return
   */
  post: params => {
    return axiosApi(
      {
        baseURL: process.env.VUE_APP_API,
        url: '/default',
        method: 'post'
      },
      params
    )
  },

  /**
   * 通用get请求
   * @param {String} url 接口url
   * @param {String} method 请求方式
   * @param {Obj} params 参数
   * @param {Fn} cb 回调函数
   * @return
   */
  get: params => {
    return axiosApi(
      {
        baseURL: process.env.VUE_APP_API,
        url: '/default',
        method: 'get'
      },
      params
    )
  }
}
