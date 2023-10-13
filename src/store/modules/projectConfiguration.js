import projectConfigurationState from "@/store/modules/config/project/state";
import projectConfigurationActions from "@/store/modules/config/project/actions";
import projectConfigurationGetters from "@/store/modules/config/project/getters";
import projectConfigurationMutations from "@/store/modules/config/project/mutations";

export default {
  namespaced: true,
  state: projectConfigurationState,
  getters: projectConfigurationGetters,
  mutations: projectConfigurationMutations,
  actions: projectConfigurationActions
}
