export default {
  mycounter(state){
    return state.counter
  },
  projectsList(state){
    return state.projectsList
  },
  selectedProjects(state){
    const selectedProjectNames = []
    for (const projectObj of state.projectsList){
      if (projectObj.isSelected){
        selectedProjectNames.push(projectObj.name)
      }
    }
    return selectedProjectNames
  },
  silosList(state){
    return state.silosList
  },
  selectedSilos(state){
    const selectedSiloNames = []
    for (const siloObj of state.silosList){
      if (siloObj.isSelected){
        selectedSiloNames.push(siloObj.name)
      }
    }
    return selectedSiloNames
  }
}