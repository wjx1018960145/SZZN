/**
 * Created by Administrator on 2018/3/29.
 */
import {getToken, setToken, removeToken} from '../../utils/auth'
import {interfacelist,addinterface,delInterFace,createInterface} from '../../api/interface'
const tools = {
  state: {
    token: getToken(),
    interfaceList: [],
    interfaceStr:'',
    path:''
  },
  mutations: {
    SET_INTERFACELIST: (state, interfaceList) => {
      state.interfaceList = interfaceList
    },
    SET_INTERFACESTR:(state,interfaceStr)=>{
      state.interfaceStr = interfaceStr
    },
    SET_PATH:(state,path)=>{
      state.path = path
}
  },
  actions: {
    //查询
    GetAllInterface({commit, state},params){
      return new Promise((resolve, reject) => {

        interfacelist(state.token).then((response) => {
          var data = response.body
          commit('SET_INTERFACELIST', data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    //添加
    AddInterface({commit, state},interInfo){
      alert(interInfo[0].name)
      return new Promise((resolve, reject) => {

        addinterface(state.token,interInfo[0].id,interInfo[0].name,interInfo[0].project,interInfo[0].rank,interInfo[1].jsonValues).then((response) => {
          var data = response.body

         // commit('SET_INTERFACELIST', data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    //删除接口
    DelInterFace({commit,state},interInfo){
      return new  Promise((resolve,reject)=>{
        delInterFace(state.token,interInfo.id).then((response)=>{
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //生成接口
    CreateInterface({commit,state},params){
      return new Promise((resolve,reject)=>{
        createInterface(state.token,params.name).then((response)=>{
          var  data = response.interface
          var path = response.path
          commit('SET_INTERFACESTR',data)
          commit('SET_PATH',path)
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    }

  }

}
export default tools
