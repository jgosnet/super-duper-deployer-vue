export default {
  updateProjectsList(state, newProjectsList){
    state.projectsList = newProjectsList;
  },
  updateIsLoading(state, value){
    state.isLoading = value;
  },
  updateFailedToLoad(state, value){
    state.failedToLoad = value;
  },
  updateErrorMessage(state, value){
    state.errorMessage = value;
  },
}