import {flask_url} from "@/scripts/config";
import axios from "axios";

export default {
  // eslint-disable-next-line no-unused-vars
  async updatePresetStatus(context, payload) {
    const url = `${flask_url}/compare/preset`
    return axios.get(url, {
        params: {
          silo_id: payload.silo_id,
          preset_id: payload.preset_id,
          project_id: 1
        }
      }
    )
      .then((response) => {
        if (response.statusText === 'OK'){
          return response.data
        }
        console.log(response.data)
        return "complete"
      })
      .catch((error) => {
        console.log('ERROR:')
        console.log(error)
        return "error"
      })
    // console.log("updating preset")
    // return new Promise((resolveInner) => {
    //   setTimeout(resolveInner, Math.floor(Math.random() * 1000) + 10000);
    //   return "loading.."
    // })
    //   .then((response) => {
    //     console.log(response)
    //     return "complete"
    //   })
  },
}