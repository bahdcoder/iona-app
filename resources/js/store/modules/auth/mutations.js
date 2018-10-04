import { LOGIN_USER, AUTH_ERROR, AUTH_TOGGLE_LOADING, LOGOUT_USER } from './constants'

export default {
  [LOGIN_USER](state, { user, token }) {
    state.user = user
    state.token = token
    state.authenticated = true
  },
  [AUTH_TOGGLE_LOADING](state) {
    state.loading = !state.loading
  },
  [AUTH_ERROR](state, errors = []) {
    state.errors = errors
  },
  [LOGOUT_USER](state) {
    state.user = null
    state.token = null
    state.authenticated = false
  }
}
