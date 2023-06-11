import {flask_url} from "@/scripts/config";
import axios from "axios";
import cookie from 'vue-cookies'

export default {
  increment(context, payload){
    context.commit('increment', payload)
  },
  loadProjectsList(context) {
    console.log('started')
    // eslint-disable-next-line no-unused-vars
    const url = `${flask_url}/config/project`
    this.isLoading = true
    this.errorMessage = ""
    // eslint-disable-next-line no-unused-vars
    axios.get(url)
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
              const filteredArray = context.state.projectsList.filter((project) => cachedProject.id == project.id);
              if (filteredArray.length > 0){
                newProjectsList.push(cachedProject)
              }
            }
          }
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
        // this.errorMessage = "Failed to fetch data from the server"
      })
      .finally(() => {
      })
  },
  updateProjectsList(context, payload){
    context.commit('updateProjectsList', payload)
  }
}