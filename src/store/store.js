import {createStore} from 'vuex'

import configuration from "@/store/modules/configuration";
import snackbar from "@/store/modules/snackbar";

export const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions:{},
  modules: {
    snackbar,
    configuration,
  }
})
