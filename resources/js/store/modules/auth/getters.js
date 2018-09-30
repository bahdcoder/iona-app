export default {
  isAuthenticated(state) {
    if (state.user && state.token) {
      return true
    }

    return false
  }
}
