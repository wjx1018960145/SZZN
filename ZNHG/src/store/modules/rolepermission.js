/**
 * Created by Administrator on 2018/3/27.
 */
import {getToken, setToken, removeToken} from '../../utils/auth'
import  {getListForRole,getListForPer,addRole,delRole,addPer,delPer} from  '../../api/rolepermission'
const roleAndpermission = {
  state: {
    token:getToken(),
    roleList: [],
    permissionList: []
  },
  mutations: {
    SET_ROLELIST: (state, roleList) => {
      state.roleList = roleList
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    }
  },
  actions:{
    //获取角色列表
    GetAllRole({commit,state}){
      return new Promise((resolve, reject)=>{
        getListForRole(state.token).then((response)=>{
          var data = response.body
          commit('SET_ROLELIST',data)
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //添加一个角色
    AddRole({commit,state},roleInfo){
      return new Promise((resolve,reject)=>{
        addRole(state.token ,roleInfo.id,roleInfo.name,roleInfo.isUse,roleInfo.operator,roleInfo.description).then((response)=>{
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //删除一个角色
    DelRole({commit,state},roleinfor){
      return new  Promise((resolve,reject)=>{
        delRole(state.token,roleinfor.id).then((response)=>{
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },


    //获取功能权限列表
    GetAllPer({commit,state}){
      return new Promise((resolve,reject)=>{
        getListForPer(state.token).then((response)=>{
          var data = response.body
          commit('SET_PERMISSIONLIST',data)
          resolve(response)
        }).catch((error)=>{
          alert(data)
          reject(error)
        })
      })
    },
    //添加一个权限
    AddPer({commit,state},roleInfo){
      return new Promise((resolve,reject)=>{
         addPer(state.token ,roleInfo.id,roleInfo.name,roleInfo.isUse,roleInfo.operator,roleInfo.description).then((response)=>{
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //删除一个权限
    DelPer({commit,state},perinfor){
      return new  Promise((resolve,reject)=>{
        delPer(state.token,perinfor.id).then((response)=>{
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },

  }

}
export default roleAndpermission
