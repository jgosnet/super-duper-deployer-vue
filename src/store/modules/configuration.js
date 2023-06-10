import configurationState from "@/store/modules/configuration/state";
import configurationActions from "@/store/modules/configuration/actions";
import configurationGetters from "@/store/modules/configuration/getters";
import configurationMutations from "@/store/modules/configuration/mutations";

export default {
  namespaced: true,
  state: configurationState,
  getters: configurationGetters,
  mutations: configurationMutations,
  actions: configurationActions
}
