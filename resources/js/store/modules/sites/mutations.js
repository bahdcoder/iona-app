import { CREATE_SITE, CREATE_SITE_LOADING } from './constants'

export default {
  [CREATE_SITE_LOADING](state) {
    state.createSiteLoading = !state.createSiteLoading
  },
  [CREATE_SITE](state, data) {
    state.site = data
  }
}
