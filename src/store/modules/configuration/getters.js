export default {
  mycounter(state){
    return state.counter
  },
  projectsList(state){
    return state.projectsList
  },
  selectedProjectNames(state, getters){
    const selectedProjectNames = []
    for (const projectObj of getters.selectedProjects){
      selectedProjectNames.push(projectObj.name)
    }
    return selectedProjectNames
  },
  selectedProjects(state){
    const selectedProjects = []
    for (const projectObj of state.projectsList){
      if (projectObj.isSelected){
        selectedProjects.push(projectObj)
      }
    }
    return selectedProjects
  },
  silosList(state){
    return state.silosList
  },
  selectedSiloNames(state){
    const selectedSiloNames = []
    for (const siloObj of state.silosList){
      if (siloObj.isSelected){
        selectedSiloNames.push(siloObj.name)
      }
    }
    return selectedSiloNames
  },
  selectedSilos(state){
    const selectedSilos = []
    for (const siloObj of state.silosList){
      if (siloObj.isSelected){
        selectedSilos.push(siloObj)
      }
    }
    return selectedSilos
  },
  errorMessage(state){
    return state.errorMessage
  }
}