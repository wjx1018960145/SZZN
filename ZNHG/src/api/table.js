/**
 * Created by Administrator on 2018/3/15.
 */
import request from '../utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
