import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    sizesLoading: false,
    getServersLoading: false,
    createServerLoading: false,
    getResourcesLoading: false,
    singleServerLoading: false,
    singleServer: {},
    sizes: [],
    regions: [],
    resources: [],
    servers: []
  },
  actions,
  getters,
  mutations
}
