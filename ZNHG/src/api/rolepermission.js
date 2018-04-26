/**
 * Created by Administrator on 2018/3/27.
 */
import request from '../utils/request'
export function getListForRole(params) {
  return request({
    url: '/rolepermission/getlistRole',
    method: 'post',
    params: {
      params
    }
  })
}
export function addRole(token,id,name,isUse,operator,description) {
  return request({
    url: '/rolepermission/addRole',
    method: 'post',
    params: {
      token,
      id,name,isUse,operator,description
    }
  })
}
export function delRole(token,id) {
  return request({
    url: '/rolepermission/deleteRole',
    method: 'post',
    params: {
      token,
      id
    }
  })
}



export function getListForPer(params) {
  return request({
    url: '/rolepermission/getlistPermission',
    method: 'post',
    params: {
      params
    }
  })
}

export function addPer(token,id,name,isUse,operator,description) {
  return request({
    url: '/rolepermission/addPermission',
    method: 'post',
    params: {
      token,
      id,name,isUse,operator,description
    }
  })
}
export function delPer(token,id) {
  return request({
    url: '/rolepermission/deletePermission',
    method: 'post',
    params: {
      token,
      id
    }
  })
}
