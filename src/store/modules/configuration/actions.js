import {flask_url} from "@/scripts/config";
import axios from "axios";
import cookie from 'vue-cookies'


export default {
  increment(context, payload){
    context.commit('increment', payload)
  },
  async loadProjectsList(context) {
    const url = `${flask_url}/config/project`
    this.isLoading = true
    context.commit('updateErrorMessage', "")
    axios.get(url)
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
    const url = `${flask_url}/config/project/${projectId}`
    this.isLoading = true
    axios.delete(url)
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
    const url = `${flask_url}/config/silo`
    this.isLoading = true
    context.commit('updateSiloErrorMessage', "")
    axios.get(url)
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
              newSilosList.push({
                id: obj.id,
                name: obj.name
              })
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
    const url = `${flask_url}/config/silo/${siloId}`
    this.isLoading = true
    axios.delete(url)
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
  }
}