import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/User'
import location from './modules/Location'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    location
  }
})
