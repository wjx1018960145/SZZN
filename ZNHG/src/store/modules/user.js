import {login, logout, getInfo} from '../../api/login'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {getAllAcountInfo,addAcountInfo,delAcountInfo,updateAcountInfo} from '../../api/accountcfg'

const user = {
  state: {
    token: getToken(),
    name: '',
    nick: '',
    avatar: '',
    roles: [],
    userlist: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_NICK: (state, nick) => {
      state.nick = nick
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERLIST: (state, userlist) => {
      state.userlist = userlist
    }

  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          //alert(data.token)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {

          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.body[0]
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.nick)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取所有职员列表
    GetAllAccound({commit, state}){
      return new Promise((resolve, reject) => {
        getAllAcountInfo(state.token).then(response => {
          const data = response.body
          commit('SET_USERLIST', data)
          console.log(data)
          resolve(response)
        }).catch(error => {
          reject(error)
        });
      })
    },
    //添加一个用户
    AddAccound({commit, state},userinfo){
      return new Promise((resolve, reject) => {
        addAcountInfo(state.token,userinfo[0].nick,userinfo[0].userid,userinfo[0].psw,userinfo[0].position,userinfo[0].phone,userinfo[1].roleArr).then(response => {
          const data = response.body
          resolve(response)
        }).catch(error => {
          reject(error)
        });
      })
    },
    //删除一个用户
    DelAccound({commit, state},userinfo){
      return new Promise((resolve, reject) => {
        delAcountInfo(state.token,userinfo.id).then(response => {
          const data = response.body
          resolve(response)
        }).catch(error => {
          reject(error)
        });
      })
    },
    //更新一个用户
    UpdateAccound({commit, state},userinfo){
      return new Promise((resolve, reject) => {
        updateAcountInfo(state.token,userinfo.id,userinfo.nick,userinfo.position,userinfo.phone).then(response => {
          const data = response.body
          resolve(response)
        }).catch(error => {
          reject(error)
        });
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
