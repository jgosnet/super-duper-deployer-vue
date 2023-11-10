import cookie from 'vue-cookies'
import {api} from "@/scripts/axios_config";


export default {
  increment(context, payload){
    context.commit('increment', payload)
  },
  updateErrorMessage(context, errorMessage){
    context.commit('updateErrorMessage', errorMessage)
  },
  updatePreSelectedSilos(context, payload){
    context.commit('updatePreSelectedSilos', payload)
  },
  // SILOS Actions
  async loadSilosList(context) {
    const url = `config/silo`
    this.isLoading = true
    context.commit('updateErrorMessage', "")
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
              const filteredArray = response.data.filter((silo) => cachedSilo.id == silo.uuid);
              if (filteredArray.length > 0){
                newSilosList.push(cachedSilo)
              }
            }
          }
          console.log(`Cached silos loaded: `)
          console.log(newSilosList)
          for (let obj of response.data){
            const filteredArray = newSilosList.filter((silo) => silo.id == obj.uuid);
            if (filteredArray.length === 0){
              newSilosList.push({
                id: obj.uuid,
                name: obj.name,
                base_url: obj.base_url,
                token: obj.token,
                customer: obj.customer,
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
  }
}