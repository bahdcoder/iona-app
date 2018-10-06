import { GET_REGIONS_AND_SIZES, SIZES_AND_REGIONS_LOADING, CREATE_SERVER_LOADING, GET_RESOURCES, GET_SERVER, GET_SERVER_LOADING, GET_RESOURCES_LOADING } from './constants'

export default {
  [SIZES_AND_REGIONS_LOADING](state) {
    state.sizesLoading = !state.sizesLoading
  },
  [GET_REGIONS_AND_SIZES](state, { regions, sizes }) {
    state.sizes = sizes
    state.regions = regions
  },
  [CREATE_SERVER_LOADING](state) {
    state.createServerLoading = !state.createServerLoading
  },
  [GET_RESOURCES](state, resources) {
    state.resources = resources
  },
  [GET_RESOURCES_LOADING](state) {
    state.getResourcesLoading = !state.getResourcesLoading
  },
  [GET_SERVER](state, server) {
    state.singleServer = server
  },
  [GET_SERVER_LOADING](state) {
    state.singleServerLoading = !state.singleServerLoading
  }
}
