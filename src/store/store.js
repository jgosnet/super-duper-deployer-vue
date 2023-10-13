import {createStore} from 'vuex'

import configuration from "@/store/modules/configuration";
import snackbar from "@/store/modules/snackbar";
import project from "@/store/modules/project";
import auth from "@/store/modules/auth";
import projectConfiguration from "@/store/modules/projectConfiguration";
import siloConfiguration from "@/store/modules/siloConfiguration";

export const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    snackbar,
    configuration,
    project,
    auth,
    projectConfiguration,
    siloConfiguration,
  }
})
