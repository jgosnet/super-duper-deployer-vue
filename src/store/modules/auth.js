import authState from "@/store/modules/auth/state"
import authGetters from "@/store/modules/auth/getters"
import authMutations from "@/store/modules/auth/mutations"
import authActions from "@/store/modules/auth/actions"


export default {
  namespaced: true,
  state: authState,
  getters: authGetters,
  mutations: authMutations,
  actions: authActions
}