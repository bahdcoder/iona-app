import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    site: {},
    sites: [],
    singleSite: {},
    getSitesLoading: false,
    singleSiteLoading: false,
    createSiteLoading: false,
    createSiteRepoLoading: false,
    createSiteEnvLoading: false,
    deleteSiteEnvLoading: false,
    deploymentLog: ''
  },
  actions,
  getters,
  mutations
}
