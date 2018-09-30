import actions from './actions'
import getters from './getters'
import mutations from './mutations'


let auth = localStorage.getItem('auth')

if (auth) {
  auth = JSON.parse(auth)
} else {
  auth = {}
}

export default {
  state: {
    loading: false,
    errors: null,
    ...auth,
  },
  actions,
  getters,
  mutations,
}
