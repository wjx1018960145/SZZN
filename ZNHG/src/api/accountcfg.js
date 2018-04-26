/**
 * Created by Administrator on 2018/3/22.
 */
import request from '../utils/request'

export function getAllAcountInfo(params) {
  return request({
    url: '/user/GetAllAccound',
    method: 'post',
    params: { params }
  })
}
export  function addAcountInfo(token,nick ,userid,psw,position,phone,roleArr) {
  return request({
    url: '/user/register',
    method: 'post',
    params: { token,nick,userid,psw,position,phone,roleArr}
  })
}

export function delAcountInfo(token,id) {
  return request({
    url: '/user/delAccound',
    method: 'post',
    params: { token,id}
  })
}
export function updateAcountInfo(token,id,nick,position,phone) {
  return request({
    url: '/user/updateAccound',
    method: 'post',
    params: { token,id,nick,position,phone}
  })
}
