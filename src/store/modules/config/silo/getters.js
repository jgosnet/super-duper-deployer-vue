export default {

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
    return state.errorMessage;
  },
  defaultImportPath(state){
    return state.defaultImportPath
  }
}