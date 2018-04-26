/**
 * Created by Administrator on 2018/4/17.
 */
import axios from 'axios'
let base = 'http://130.252.9.245:8080/szznkj'
const user = "/user"
const product = "/product"
const links =  "/link"
const role = "/rolepermission"
const partner = "/partner"
export default {
  data(){
    return{
      object:'',
      error:''
    }
  },
  requestLogin(params){
    return axios.post(`${base}${user}/login.do`, params).then(res=>res)
  },
  requestPost(params){
    return axios.post(`${base}${product}/getStatisticalAnalysis.do`,params).then(function(){response}).catch(function(error){error})
  },
  requestLink(params){
    return axios.post(`${base}${links}/getAlllink.do`,params).then(res => res)
  },
  requestLinks(params){
    return axios.post(`${base}${links}/findAll.do`,params).then(res => res)
  },
  requestRegister(params){
    return axios.post(`${base}${user}/register.do`, params).then(res=>res)
  },
  requestListForApp(params){
    return axios.post(`${base}${product}/getlist.do`, params).then(res=>res)
  },
  requestListAppForIndex(params){
    return axios.post(`${base}${product}/queryAppForIndex.do`, params).then(res=>res)
  },
  requestdeleteApp(params){
    return axios.post(`${base}${product}/deleapp.do`, params).then(res=>res)
  },
  requestqueryApp(params){
    return axios.post(`${base}${product}/queryApp.do?`, params).then(res=>res)
  },
  requestupdateApp(params){
    return axios.post(`${base}${product}/updateApp.do?`, params).then(res=>res)
  },
  requestupdateAppNormal(params){
    return axios.post(`${base}${product}/updateAppNormal.do?`, params).then(res=>res)
  },
  requestListForRole(params){
    return axios.post(`${base}${role}/getlistRole.do`, params).then(res=>res)
  },
  requestaddRole(params){
    return axios.post(`${base}${role}/addRole.do`, params).then(res=>res)
  },
  requestdelRole(params){
    return axios.post(`${base}${role}/deleteRole.do`, params).then(res=>res)
  },
  requestchangRole(params){
    return axios.post(`${base}${role}/changRole`, params).then(res=>res)
  },
  requestListForPermission(params){
    return axios.post(`${base}${role}/getlistPermission.do`, params).then(res=>res)
  },
  requestaddPermission(params){
    return axios.post(`${base}${role}/addPermission.do`, params).then(res=>res)
  },
  requestdelPermission(params){
    return axios.post(`${base}${role}/deletePermission.do`, params).then(res=>res)
  },
  requestchangPermission(params){
    return axios.post(`${base}${role}/changPermission`, params).then(res=>res)
  },
  requestgetStartRole(params){
    return axios.post(`${base}${role}/selectStartRole.do`, params).then(res=>res)
  },
  requestgetPermissionWithRoleid(params){
    return axios.post(`${base}${role}/selectPermissionForRole.do`, params).then(res=>res)
  },
  requestdeletePermissionWithRoleid(params){
    return axios.post(`${base}${role}/deletePermissionForRole.do`, params).then(res=>res)
  },
  requestaddPermissionWithRoleid(params){
    return axios.post(`${base}${role}/addPermissionForRole.do`, params).then(res=>res)
  },
  requestaddRoleForU(params){
    return axios.post(`${base}${role}/selectRoleForU.do`, params).then(res=>res)
  },
  requestaddpartnerImage(params,config){
    return axios.post(`${base}${partner}/imageUpload.do`, params,config).then(res=>res)
  },
  requestlistpartner(params){
    return axios.post(`${base}${partner}/getlist.do`, params).then(res=>res)
  },
  requestaddpartner(params){
    return axios.post(`${base}${partner}/addPartner.do`, params).then(res=>res)
  },
  requestupdatepartner(params){
    return axios.post(`${base}${partner}/udpdatePartner.do`, params).then(res=>res)
  },
  requestdeletepartner(params){
    return axios.post(`${base}${partner}/deletePartner.do`, params).then(res=>res)
  }


}
