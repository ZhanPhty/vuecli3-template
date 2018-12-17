import axiosApi from '@/axios/config'

export default {
  /**
   * login
   * @param {String} url 接口url
   * @param {String} method 请求方式
   * @param {Obj} params 参数
   * @param {Fn} cb 回调函数
   * @return
   */
  login: params => {
    return axiosApi(
      {
        baseURL: process.env.VUE_APP_API,
        url: '/login',
        method: 'post'
      },
      params
    )
  }
}
