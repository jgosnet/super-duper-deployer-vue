import cookie from 'vue-cookies'
import {api} from "@/scripts/axios_config";


export default {
  increment(context, payload){
    context.commit('increment', payload)
  },
  async loadProjectsList(context) {
    const url = `config/project`
    this.isLoading = true
    context.commit('updateErrorMessage', "")
    api.get(url)
      .then((response) => {
        if (response.statusText === 'OK'){
          // Following order:
          // 1\ use cookies to setup array and order
          // 2\ insert remaining items
          // update vuex
          let newProjectsList = []
          console.log(`getting projects list..`)
          if (cookie.isKey('selectedProjects')){
            console.log(`Cookies found for: selectedProjects`)
            const cachedProjectsList = JSON.parse(JSON.stringify(cookie.get('selectedProjects')));
            console.log(cachedProjectsList)
            for (const cachedProject of cachedProjectsList){
              const filteredArray = response.data.filter((project) => cachedProject.id == project.id);
              if (filteredArray.length > 0){
                newProjectsList.push(cachedProject)
              }
            }
          }
          console.log(`Cached projects loaded: `)
          console.log(newProjectsList)
          for (let obj of response.data){
            const filteredArray = newProjectsList.filter((project) => project.id == obj.id);
            if (filteredArray.length === 0){
              newProjectsList.push({
                id: obj.id,
                name: obj.name,
                type: obj.project_type,
                path: obj.local_path,
                config_type: obj.config_type,
              })
            }
          }
          context.commit('updateProjectsList', newProjectsList)
          return response.data
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = 'Failed to get the project list from server'
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
        context.commit('updateErrorMessage', errorMessage)
      })
      .finally(() => {
      })
  },
  updateProjectsList(context, payload){
    context.commit('updateProjectsList', payload)
  },
  updateErrorMessage(context, errorMessage){
    context.commit('updateErrorMessage', errorMessage)
  },
  async deleteProject(context, projectId){
    const url = `config/project/${projectId}`
    this.isLoading = true
    api.delete(url)
      .then((response) => {
        if (response.statusText === 'OK'){
          context.dispatch('loadProjectsList')
          return
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = `Failed to delete the project: ${projectId}`
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
        // context.commit('updateErrorMessage', errorMessage)
      })
      .finally(() => {
      })
  },
  updateSiloErrorMessage(context, errorMessage){
    context.commit('updateSiloErrorMessage', errorMessage)
  },
  // SILOS Actions
  async loadSilosList(context) {
    const url = `config/silo`
    this.isLoading = true
    context.commit('updateSiloErrorMessage', "")
    api.get(url)
      .then((response) => {
        if (response.statusText === 'OK'){
          let newSilosList = []
          console.log(`getting silos list..`)
          if (cookie.isKey('selectedSilos')){
            console.log(`Cookies found for: selectedSilos`)
            const cachedSilosList = JSON.parse(JSON.stringify(cookie.get('selectedSilos')));
            console.log(cachedSilosList)
            for (const cachedSilo of cachedSilosList){
              const filteredArray = response.data.filter((project) => cachedSilo.id == project.id);
              if (filteredArray.length > 0){
                newSilosList.push(cachedSilo)
              }
            }
          }
          console.log(`Cached silos loaded: `)
          console.log(newSilosList)
          for (let obj of response.data){
            const filteredArray = newSilosList.filter((silo) => silo.name == obj.name);
            if (filteredArray.length === 0){
              newSilosList.push(obj)
            }
          }
          context.commit('updateSilosList', newSilosList)
          return response.data
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = 'Failed to get the silo list from server'
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
        context.commit('updateSiloErrorMessage', errorMessage)
      })
      .finally(() => {
      })
  },
  updateSilosList(context, payload){
    context.commit('updateSilosList', payload)
  },
  async deleteSilo(context, siloId){
    const url = `config/silo/${siloId}`
    this.isLoading = true
    api.delete(url)
      .then((response) => {
        if (response.statusText === 'OK'){
          context.dispatch('loadSilosList')
          return
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = `Failed to delete the silo: ${siloId}`
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
        // context.commit('updateErrorMessage', errorMessage)
      })
      .finally(() => {
      })
  },
  updateDefaultImportPath(context, path){
    context.commit('updateDefaultImportPath', path)
  },
  loadDefaultImportPath(context){
    if (cookie.isKey('defaultImportPath')){
      console.log(`Cookies found for: defaultImportPath`)
      const cachedDefaultImportPath = JSON.parse(JSON.stringify(cookie.get('defaultImportPath')));
      console.log(cachedDefaultImportPath);
      context.dispatch('updateDefaultImportPath', cachedDefaultImportPath);
    }
  },
  async loadConfiguration(context){
    context.dispatch('loadProjectsList');
    context.dispatch('loadSilosList');
    context.dispatch('loadDefaultImportPath');
  },
  async addNewProject(context, payload) {
    const url = `config/project/${payload.project_type}`
    console.log(payload)
    api.post(url, payload)
      .then((response) => {
        console.log(response.statusText)
        if (response.statusText === 'CREATED'){
          payload.id = response.data.id
          payload.type = payload.project_type
          payload.path = payload.local_path
          console.log(payload)
          console.log(`added project: ${payload.id}`)
          context.commit('addNewProjectToList', payload)
          return true
        }
        return false
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = 'Failed to add project'
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
      })
      .finally(() => {
      })
  },
  async addNewSilo(context, payload) {
    const url = `config/silo`
    console.log(payload)
    api.post(url, payload)
      .then((response) => {
        console.log(response.statusText)
        if (response.statusText === 'CREATED'){
          payload.id = response.data.id
          console.log(payload)
          console.log(`added project: ${payload.id}`)
          context.commit('addNewSiloToList', payload)
          return true
        }
        return false
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = 'Failed to add silo'
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
      })
      .finally(() => {
      })
  },
}