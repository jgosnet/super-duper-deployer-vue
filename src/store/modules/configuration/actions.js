import {flask_url} from "@/scripts/config";
import axios from "axios";

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
        console.log("----> " + response.statusText)
        if (response.statusText === 'OK'){
          console.log("STATUS OK")
          console.log(response.data)
          const res = []
          for (let obj of response.data){
            console.log("Object is:")
            console.log(obj)
            res.push({
              id: obj.id,
              name: obj.name,
              type: obj.project_type,
              path: obj.local_path,
              config_type: obj.config_type,
            })
          }
          console.log("finished")
          console.log(res)
          context.commit('updateProjectsList', res)
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