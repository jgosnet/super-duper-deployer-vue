<template lang="pug">
v-btn.ml-3(icon="fas fa-plus" @click="dialog = true")
v-dialog(v-model="dialog"
      transition="dialog-top-transition"
      width="auto"
      min-width="500" )
  template(v-slot:activator="{ props }")
  v-card
    v-card-title Add new Silo
    v-card-text
      v-form.mt-0(@submit.prevent="submit"
                        v-model="isFormValid")
        v-text-field(label="Name"
          :rules="siloNameRules"
          v-model="siloname")
        v-text-field(label="Customer"
          v-model="customer")
        v-text-field(label="Base URL"
          hint="ex: staging.sdvi.com"
          v-model="baseUrl"
          :rules="baseUrlRules")
        v-text-field(label="Token"
          :append-icon="showToken ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
          v-model="token"
          :type="showToken ? 'text' : 'password'"
          @click:append="showToken = !showToken")
        v-btn(type="submit"
          block
          :disabled="!isFormValid"
          variant="outlined") Create
        div(v-if="isLoading" )
          v-progress-circular(v-show="isLoading" indeterminate
              color="primary"
              model-value="20")
          span.pl-2 Loading..

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NewSiloForm",
  data(){
    return {
      isLoading: false,
      dialog: false,
      isFormValid: false,
      siloname: "",
      siloNameRules: [
          v => !!v || 'Path is required',
          v => !this.siloNameExists(v) || 'Path already specified in another project',
      ],
      customer: "",
      baseUrl: "",
      baseUrlRules: [
          v => !!v || 'base_url is required',
          v => v.endsWith('.sdvi.com') || 'base_url needs to end with .sdvi.com',
      ],
      token:"",
      showToken: false,
    }
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSiloNames', 'errorMessage']),
  },
  methods: {
    sleep(ms){
      console.log("sleeping")
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async submit() {
      this.isLoading = true;
      console.log(`STATUS OF VALIDATION: ${this.isFormValid}`)
      var payload = {
        name: this.siloname,
        customer: this.customer,
        token: this.token,
        base_url: this.baseUrl,
      };
      await this.$store.dispatch('siloConfiguration/addNewSilo', payload);
      // await this.sleep(1000);
      await this.$store.dispatch('siloConfiguration/loadSilosList', payload);
      console.log("reloaded silos")
      this.isLoading = false;
      this.dialog = false;
    },
    siloNameExists(value){
      for (const silo of this.$store.getters['siloConfiguration/selectedSilos']){
        console.log(silo.name)
        if (silo.name === value){
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>