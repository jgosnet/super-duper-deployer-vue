export default {
  projectErrorMessage(state){
    return state.projectErrorMessage;
  },
  isLoading(state){
    return state.isLoading;
  },
  projectsList(state){
    return state.projectsList
  },
  errorMessage(state){
    return state.errorMessage;
  },
  selectedProjectNames(state, getters){
    const selectedProjectNames = []
    for (const projectObj of getters.selectedProjects){
      selectedProjectNames.push(projectObj.name)
    }
    return selectedProjectNames
  },
  selectedProjectIds(state, getters){
    const selectedProjectIds = []
    for (const projectObj of getters.selectedProjects){
      selectedProjectIds.push(projectObj.id)
    }
    return selectedProjectIds
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
}