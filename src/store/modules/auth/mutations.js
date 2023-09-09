export default {

  updateLoginLoading(state, newValue){
    // console.log(`Updating isLoading to ${newValue}`)
    state.isLoading = newValue
  },
  updateIsLoggedIn(state, value){
    // console.log(`Updating IsLoggedIn to ${value}`)
    state.isLoggedIn = value
  },
  updateAuth(state, value){
    console.log(`updateAuth ${value}`)
    state.token = value.token
    state.tokenExpiration = value.tokenExpiration
    state.username = value.username
    state.isLoggedIn = value.isLoggedIn
    state.isLoading = value.isLoading
  }
};