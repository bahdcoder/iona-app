export default {
  environment(state) {
    return state.singleSite.settings && state.singleSite.settings.environment
  }
}
