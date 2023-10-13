import cookie from 'vue-cookies'
import {api} from "@/scripts/axios_config";


export default {
  async loadProjectsList(context) {
    const url = `config/project`;
    console.log("LOADING ?")
    context.commit('updateIsLoading', true);
    context.commit('updateErrorMessage', "");
    return api.get(url)
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
              console.log(`cached project:`)
              console.log(cachedProject)
              const filteredArray = response.data.filter((project) => cachedProject.id == project.uuid);
              if (filteredArray.length > 0){
                newProjectsList.push(cachedProject)
              }
            }
          }
          console.log(`Cached projects loaded: `)
          console.log(newProjectsList)
          for (let obj of response.data){
            const filteredArray = newProjectsList.filter((project) => project.id == obj.uuid);
            if (filteredArray.length === 0){
              newProjectsList.push({
                id: obj.uuid,
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
        context.commit('updateIsLoading', false)
      })
  },
  updateProjectsList(context, payload){
    context.commit('updateProjectsList', payload)
  },
  async deleteProject(context, projectId){
    const url = `config/project/${projectId}`
    this.isLoading = true
    return api.delete(url)
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
  updateIsLoading(context, value) {
      context.commit('updateIsLoading', value)
  },
  updateFailedToLoad(context, value) {
      context.commit('updateFailedToLoad', value)
  },
  updateErrorMessage(context, value) {
      context.commit('updateErrorMessage', value)
  },
}