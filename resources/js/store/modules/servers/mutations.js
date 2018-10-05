import { GET_REGIONS_AND_SIZES, SIZES_AND_REGIONS_LOADING, CREATE_SERVER_LOADING } from './constants'

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
  }
}
