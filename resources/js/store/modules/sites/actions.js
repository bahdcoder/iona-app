import { CREATE_SITE, CREATE_SITE_LOADING } from './constants'

export default {
  async [CREATE_SITE]({ commit }, data){
    try {
      commit(CREATE_SITE_LOADING)
      console.log('------->>>', data)
      const { data: response } = await axios.post('/api/sites', data)
      console.log(response)

      commit(CREATE_SITE_LOADING)
      return Promise.resolve()
    }


    catch (errors)

    {
      commit(CREATE_SITE_LOADING)
      return Promise.reject()
    }
  }
}
