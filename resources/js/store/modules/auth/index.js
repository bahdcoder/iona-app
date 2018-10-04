import actions from './actions'
import getters from './getters'
import mutations from './mutations'

let authenticated = false
let auth = localStorage.getItem('auth')

if (auth) {
  auth = JSON.parse(auth)
  authenticated = true
} else {
  auth = {}
}

export default {
  namespaced: true,
  state: {
    loading: false,
    errors: [],
    authenticated,
    ...auth,
  },
  actions,
  getters,
  mutations,
}
