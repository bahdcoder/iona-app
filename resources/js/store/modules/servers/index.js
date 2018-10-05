import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    sizesLoading: false,
    createServerLoading: false,
    sizes: [],
    regions: []
  },
  actions,
  getters,
  mutations,
}
