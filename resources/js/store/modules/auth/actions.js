import { setAxios } from '@/bootstrap'
import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR, CONNECT_SOCIAL_AUTH, AUTH_TOGGLE_LOADING, REGISTER_USER } from './constants'

export default {
  async [LOGIN_USER]({ commit }, data) {
    try {
      commit(AUTH_TOGGLE_LOADING)
      commit(AUTH_ERROR, [])
      const { data: auth } = await axios.post('/auth/login', data)

      localStorage.setItem('auth', JSON.stringify(auth))
      
      commit(AUTH_TOGGLE_LOADING)
      commit(LOGIN_USER, auth)

      setAxios()

      return Promise.resolve()
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
  },
  async [CONNECT_SOCIAL_AUTH]({ commit }, { code }) {
    try {
      const { data } = await axios.post('/auth/digitalocean/callback', {
        code
      })

      const auth = JSON.parse(localStorage.getItem('auth'))
      auth.user = data.user

      localStorage.setItem('auth', JSON.stringify(auth))
      commit(LOGIN_USER, auth)

      return Promise.resolve()
    }

    catch (error) {
      // flash the user an error message.
      return Promise.reject(error)
    }
  },
  async [REGISTER_USER]({ commit }, data) {
    try {
      commit(AUTH_TOGGLE_LOADING)
      commit(AUTH_ERROR, [])
      const { data: auth } = await axios.post('/auth/register', data)
      commit(AUTH_TOGGLE_LOADING)

      localStorage.setItem('auth', JSON.stringify(auth))
      
      commit(LOGIN_USER, auth)

      setAxios()

      return Promise.resolve()
    }

    catch(error) {
      commit(AUTH_TOGGLE_LOADING)
      commit(AUTH_ERROR, error.response.data)

      return Promise.reject(error.response)
    }
  }
}
