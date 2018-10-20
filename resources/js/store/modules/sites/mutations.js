import { CREATE_SITE, GET_SITE, CREATE_SITE_LOADING, CREATE_SITE_REPO_LOADING, GET_SITE_LOADING, CREATE_SITE_REPO, GET_SITES_LOADING, GET_SITES } from './constants'

export default {
  [CREATE_SITE_LOADING] (state) {
    state.createSiteLoading = !state.createSiteLoading
  },
  [CREATE_SITE] (state, data) {
    state.site = data
  },
  [GET_SITE] (state, data) {
    state.singleSite = {
      ...data,
      settings: JSON.parse(data.settings)
    }
  },
  [CREATE_SITE_REPO] (state, data) {
    state.singleSite = data
  },
  [GET_SITE_LOADING] (state) {
    state.singleSiteLoading = !state.singleSiteLoading
  },
  [CREATE_SITE_REPO_LOADING] (state) {
    state.createSiteRepoLoading = !state.createSiteRepoLoading
  },
  [GET_SITES] (state, data) {
    state.sites = data
  },
  [GET_SITES_LOADING] (state) {
    state.getSitesLoading = !state.getSitesLoading
  }
}
