import {api} from "@/scripts/axios_config";

export default {
  // eslint-disable-next-line no-unused-vars
  async updatePresetStatus(context, payload) {
    const url = `compare/preset`
    return api.get(url, {
        params: {
          silo_id: payload.silo_id,
          project_file_id: payload.preset_id
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
    // eslint-disable-next-line no-unused-vars
  async updateRuleStatus(context, payload) {
    const url = `compare/rule`
    return api.get(url, {
        params: {
          silo_id: payload.silo_id,
          project_file_id: payload.preset_id
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