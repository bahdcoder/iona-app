import {
  CREATE_SITE,
  GET_SITE,
  CREATE_SITE_LOADING,
  CREATE_SITE_REPO_LOADING,
  GET_SITE_LOADING,
  CREATE_SITE_REPO,
  GET_SITES_LOADING,
  GET_SITES,
  CREATE_SITE_ENV_LOADING,
  DELETE_SITE_ENV_LOADING,
  CREATE_DEPLOYMENT_LOG
} from './constants'

export default {
  [CREATE_SITE_LOADING](state) {
    state.createSiteLoading = !state.createSiteLoading
  },
  [CREATE_SITE](state, data) {
    state.site = data
  },
  [GET_SITE](state, data) {
    state.singleSite = data
  },
  [CREATE_SITE_REPO](state, data) {
    state.singleSite = data
  },
  [GET_SITE_LOADING](state) {
    state.singleSiteLoading = !state.singleSiteLoading
  },
  [CREATE_SITE_REPO_LOADING](state) {
    state.createSiteRepoLoading = !state.createSiteRepoLoading
  },
  [GET_SITES](state, data) {
    state.sites = data
  },
  [GET_SITES_LOADING](state) {
    state.getSitesLoading = !state.getSitesLoading
  },
  [CREATE_SITE_ENV_LOADING](state) {
    state.createSiteEnvLoading = !state.createSiteEnvLoading
  },
  [DELETE_SITE_ENV_LOADING](state) {
    state.deleteSiteEnvLoading = !state.deleteSiteEnvLoading
  },
  [CREATE_DEPLOYMENT_LOG](state, logs) {
    state.deploymentLog += logs
  }
}
