export default {
  increment(state){
    state.counter++
  },
  updateProjectsList(state, newProjectsList){
    state.projectsList = newProjectsList
  },
  updateErrorMessage(state, errorMessage){
    state.errorMessage = errorMessage
  },
  updateSilosList(state, newSilosList){
    state.silosList = newSilosList
  },
  updateSiloErrorMessage(state, errorMessage){
    state.siloErrorMessage = errorMessage
  },
  updateDefaultImportPath(state, path){
    state.defaultImportPath = path
  },
  addNewProjectToList(state, newProject){
    state.projectsList.push(newProject)
  },
  addNewSiloToList(state, newSilo){
    state.silosList.push(newSilo)
  },
}