import { CREATE_DEPLOYMENT_LOADING } from './constants'

export default {
  [CREATE_DEPLOYMENT_LOADING] (state) {
    state.createDeploymentLoading = !state.createDeploymentLoading
  }
}
