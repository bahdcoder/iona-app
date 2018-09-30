import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR, AUTH_TOGGLE_LOADING } from './constants'

export default {
  async [LOGIN_USER]({ commit }, data) {
    try {
      commit(AUTH_TOGGLE_LOADING)
      commit(AUTH_ERROR, null)
      const { data: auth } = await axios.post('/auth/login', data)

      localStorage.setItem('auth', JSON.stringify(auth))
      
      commit(LOGIN_USER, auth)
      commit(AUTH_TOGGLE_LOADING)
    }

    catch(error) {
      commit(AUTH_TOGGLE_LOADING)
      commit(AUTH_ERROR, error.response.data)

      return Promise.reject(error.response)
    }
  },
  async [LOGOUT_USER]({ commit }) {
    commit(LOGOUT_USER)

    localStorage.removeItem('auth')

    return Promise.resolve()
  }
}
