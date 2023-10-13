export default {
  updateErrorMessage(state, errorMessage){
    state.errorMessage = errorMessage
  },
  updateSilosList(state, newSilosList){
    state.silosList = newSilosList
  },
  updateDefaultImportPath(state, path){
    state.defaultImportPath = path
  },
  addNewSiloToList(state, newSilo){
    state.silosList.push(newSilo)
  },
}