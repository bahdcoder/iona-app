import { CREATE_DEPLOYMENT_LOADING, CREATE_DEPLOYMENT } from './constants'

export default {
  async [CREATE_DEPLOYMENT] ({ commit }, { server, site }) {
    commit(CREATE_DEPLOYMENT_LOADING)

    try {
      const { data } = await axios.post(`/api/servers/${server}/sites/${site}/deployments`)

      commit(CREATE_DEPLOYMENT_LOADING)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
