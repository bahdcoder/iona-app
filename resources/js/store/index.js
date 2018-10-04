import Vue from 'vue'
import auth from './modules/auth'
import Vuex, { Store } from 'vuex'
import servers from './modules/servers'

Vue.use(Vuex)

export default new Store({
  modules: {
    auth,
    servers
  }
})
