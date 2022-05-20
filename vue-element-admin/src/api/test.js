import request from '@/utils/request'

/**
 * 测试接口
 * @param {*} params
 * @returns
 */
export function getTestList(params) {
  return request({
    url: '/vue-admin-template/test/list',
    method: 'get',
    params
  })
}
