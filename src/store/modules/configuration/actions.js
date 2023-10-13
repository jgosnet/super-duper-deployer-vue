// import cookie from 'vue-cookies'
// import {api} from "@/scripts/axios_config";


export default {

  async loadConfiguration(context) {
    context.dispatch('projectConfiguration/loadProjectsList', null, {root: true});
    context.dispatch('siloConfiguration/loadSilosList', null, {root: true});
    // context.dispatch('loadDefaultImportPath');
  }
}