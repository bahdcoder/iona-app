import { GET_SITE, CREATE_SITE, GET_SITES, GET_SITES_LOADING, CREATE_SITE_LOADING, CREATE_SITE_REPO, CREATE_SITE_REPO_LOADING, GET_SITE_LOADING, CREATE_SITE_ENV, CREATE_SITE_ENV_LOADING, DELETE_SITE_ENV, DELETE_SITE_ENV_LOADING, CREATE_DEPLOYMENT_LOG } from './constants'

export default {
  async [CREATE_SITE] ({ commit }, { data, id }) {
    try {
      commit(CREATE_SITE_LOADING)
      const { data: response } = await axios.post(`/api/servers/${id}/sites`, data)

      commit(CREATE_SITE_LOADING)
      return Promise.resolve(response)
    } catch (errors) {
      commit(CREATE_SITE_LOADING)
      return Promise.reject(errors)
    }
  },

  async [CREATE_SITE_REPO] ({ commit }, { data, server, site }) {
    try {
      commit(CREATE_SITE_REPO_LOADING)

      const { data: response } = await axios.post(`/api/servers/${server}/sites/${site}/repos`, data)

      commit(CREATE_SITE_REPO_LOADING)
      commit(CREATE_SITE_REPO, response)

      return Promise.resolve(response)
    } catch (errors) {
      return Promise.reject(errors.response)
    }
  },

  async [GET_SITES] ({ commit }, { server }) {
    try {
      commit(GET_SITES_LOADING)

      const { data } = await axios.get(`/api/servers/${server}/sites`)

      commit(GET_SITES_LOADING)
      commit(GET_SITES, data)

      return Promise.resolve(data)
    } catch (errors) {
      commit(GET_SITES_LOADING)
      return Promise.reject(errors)
    }
  },

  async [GET_SITE] ({ commit }, { id, server }) {
    try {
      commit(GET_SITE_LOADING)

      const { data } = await axios.get(`/api/servers/${server}/sites/${id}`)

      commit(GET_SITE, data)

      commit(GET_SITE_LOADING)
      return Promise.resolve(data)
    } catch (errors) {
      return Promise.reject(errors)
    }
  },

  async [CREATE_SITE_ENV] ({ commit }, { key, value, server, site }) {
    try {
      commit(CREATE_SITE_ENV_LOADING)
      const { data } = await axios.post(`/api/servers/${server}/sites/${site}/environment`, {
        key, value
      })

      commit(GET_SITE, data)
      commit(CREATE_SITE_ENV_LOADING)
      return Promise.resolve(data)
    } catch (error) {
      commit(CREATE_SITE_ENV_LOADING)
      return Promise.reject(error)
    }
  },

  async [DELETE_SITE_ENV] ({ commit }, { key, server, site }) {
    try {
      commit(DELETE_SITE_ENV_LOADING)

      const { data } = await axios.delete(`/api/servers/${server}/sites/${site}/environment/${key}`)

      commit(GET_SITE, data)
      commit(DELETE_SITE_ENV_LOADING)

      return Promise.resolve(data)
    } catch (errors) {
      return Promise.reject(errors)
    }
  },

  async [CREATE_DEPLOYMENT_LOG] ({ commit }, log) {
    commit(CREATE_DEPLOYMENT_LOG, log)
  }
}
