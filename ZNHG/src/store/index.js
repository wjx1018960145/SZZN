import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import rolepermission from './modules/rolepermission'
import tool from './modules/tools'
import getters from './getters'
import permission from './modules/premission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    rolepermission,
   tool,
    permission
  },
  getters
})

export default store
