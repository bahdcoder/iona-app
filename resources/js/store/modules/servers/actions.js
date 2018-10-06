import { GET_REGIONS_AND_SIZES, SIZES_AND_REGIONS_LOADING, CREATE_SERVER_LOADING, CREATE_SERVER, GET_RESOURCES, GET_SERVER_LOADING, GET_SERVER,  GET_RESOURCES_LOADING } from './constants'

export default {
  async [GET_REGIONS_AND_SIZES]({ commit, state }) {
    try {
      if (state.regions.length > 0 && state.sizes.length > 0) {
        return
      }

      commit(SIZES_AND_REGIONS_LOADING)
      const { data } = await axios.get('/api/droplets/sizes')
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

      const { data: server } = await axios.post('/api/droplets', data)

      commit(CREATE_SERVER_LOADING)
      return Promise.resolve(server)
    }

    catch (error) {
      commit(CREATE_SERVER_LOADING)
      return Promise.reject(error)
    }
  },
  async [GET_RESOURCES]({ commit }) {
    commit(GET_RESOURCES_LOADING)

    const { data } = await axios.get('/api/resources')

    commit(GET_RESOURCES, data)

    commit(GET_RESOURCES_LOADING)

    return Promise.resolve()
  },
  async [GET_SERVER]({ commit, state, getters }, { id, serverCalledTimes }) {
    try {
      
      if (serverCalledTimes === 1) {
        commit(GET_SERVER_LOADING)
      }

      const { data } = await axios.get(`/api/servers/${id}`)

      commit(GET_SERVER, data)
      if (serverCalledTimes === 1) {
        commit(GET_SERVER_LOADING)
      }

      return Promise.resolve(data)
    }

    catch (error) {
      if (serverCalledTimes === 1) {
        commit(GET_SERVER_LOADING)
      }
      return Promise.reject(error)
    }
  }
}
