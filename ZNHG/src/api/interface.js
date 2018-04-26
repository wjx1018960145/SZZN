/**
 * Created by Administrator on 2018/3/29.
 */
import request from '../utils/request'

export function interfacelist(token) {
  return request({
    url: '/tools/selectAllinterface',
    method: 'post',
    params: { token }
  })
}

export function addinterface(token,id,name,project,rank,values) {
  return request({
    url: '/tools/addinterface',
    method: 'post',
    params: { token,id,name,project,rank,values }
  })
}
export  function  delInterFace(token,name) {
  return request ({
    url: '/tools/delinterface',
    method: 'post',
    params: { token,name}
  })
}
export function createInterface(token,name) {
  return request ({
    url: '/tools/creatInterface',
    method: 'post',
    params: { token,name}
  })
}
