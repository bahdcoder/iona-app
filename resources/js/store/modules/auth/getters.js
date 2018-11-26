export default {
  getErrorsFor: state => field =>
    state.errors.filter(error => error.field === field),
  hasErrorsFor: (state, { getErrorsFor }) => field =>
    getErrorsFor(field).length > 0
}
