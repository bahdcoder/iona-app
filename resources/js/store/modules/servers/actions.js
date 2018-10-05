import { GET_REGIONS_AND_SIZES, SIZES_AND_REGIONS_LOADING, CREATE_SERVER_LOADING, CREATE_SERVER } from './constants'

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
  },
  async [CREATE_SERVER]({ commit }, data) {
    try {
      commit(CREATE_SERVER_LOADING)

      await axios.post('/droplets', data)

      commit(CREATE_SERVER_LOADING)
      return Promise.resolve()
    }

    catch (error) {
      commit(CREATE_SERVER_LOADING)
      return Promise.reject(error)
    }
  }
}
