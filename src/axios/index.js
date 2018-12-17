/*
 * 引用api模块
 *
 * // 示例：调用user模块下的login接口
 * this.$api.user.login({
 *   userid: 1
 * }).then(res => {
 *   res.data
 * }).catch(err => {
 *   err.data
 * })
 */

import common from '@/axios/api/common'
import user from '@/axios/api/user'

export default {
  common,
  user
}
