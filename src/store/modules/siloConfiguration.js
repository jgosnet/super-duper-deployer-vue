import siloConfigurationState from "@/store/modules/config/silo/state";
import siloConfigurationActions from "@/store/modules/config/silo/actions";
import siloConfigurationGetters from "@/store/modules/config/silo/getters";
import siloConfigurationMutations from "@/store/modules/config/silo/mutations";

export default {
  namespaced: true,
  state: siloConfigurationState,
  getters: siloConfigurationGetters,
  mutations: siloConfigurationMutations,
  actions: siloConfigurationActions
}
