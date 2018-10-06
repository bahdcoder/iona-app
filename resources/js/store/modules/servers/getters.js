export default {
  server(state) {
    if (state.singleServer.stats) {
      return {
        ...state.singleServer,
        stats: JSON.parse(state.singleServer.stats)
      }
    }

    return state.singleServer
  }
}
