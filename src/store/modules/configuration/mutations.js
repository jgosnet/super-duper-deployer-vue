export default {
  increment(state){
    state.counter++
  },
  updateProjectsList(state, newProjectsList){
    state.projectsList = newProjectsList
  }
}