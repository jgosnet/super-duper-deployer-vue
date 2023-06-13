import projectState from "@/store/modules/project/state";
import projectActions from "@/store/modules/project/actions";
import projectGetters from "@/store/modules/project/getters";
import projectMutations from "@/store/modules/project/mutations";

export default {
  namespaced: true,
  state: projectState,
  getters: projectGetters,
  mutations: projectMutations,
  actions: projectActions
}
