import { GET_REGIONS_AND_SIZES, SIZES_AND_REGIONS_LOADING } from './constants'

export default {
  async [GET_REGIONS_AND_SIZES]({ commit, state }) {
    try {
      if (state.regions.length > 0 && state.sizes.length > 0) {
        return
      }

      commit(SIZES_AND_REGIONS_LOADING)
      const { data } = await axios.get('/droplets/sizes')
      const { sizes, regions } = data
      commit(SIZES_AND_REGIONS_LOADING)
      commit(GET_REGIONS_AND_SIZES, { sizes, regions })
    }


    catch (error) {
      commit(SIZES_AND_REGIONS_LOADING)
      return Promise.reject(error)
    }
  }
}
