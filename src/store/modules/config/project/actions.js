import cookie from 'vue-cookies'
import {api} from "@/scripts/axios_config";


export default {
  async loadProjectsList(context) {
    const url = `config/project`;
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
          if (cookie.isKey('selectedProjects')){
            const cachedProjectsList = JSON.parse(JSON.stringify(cookie.get('selectedProjects')));
            for (const cachedProject of cachedProjectsList){
              const filteredArray = response.data.filter((project) => cachedProject.id == project.uuid);
              if (filteredArray.length > 0){
                newProjectsList.push(cachedProject)
              }
            }
          }
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
          console.log("DATA UPDATED")

        }
      })
      .catch(() => {
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
      })
      .catch(() => {
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
    api.post(url, payload)
      .then((response) => {
        if (response.statusText === 'CREATED'){
          payload.id = response.data.id
          payload.type = payload.project_type
          payload.path = payload.local_path
          // context.commit('addNewProjectToList', payload)
          return true
        }
        return false
      })
      .catch((error) => {
        const errorMessage = `Failed to add project (${error.response.data})`
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