<template lang="pug">
v-btn.ml-3(icon="fas fa-plus" @click="dialog = true")
v-dialog(v-model="dialog"
      transition="dialog-top-transition"
      @keyup.esc="closeDialog"
      width="auto"
      min-width="500" )
  template(v-slot:activator="{ props }")
  v-card
    v-card-title Add new project
    v-card-text
      v-form.mt-0(validate-on="submit lazy"
                        @submit.prevent="submit")
        v-select(v-model="projectType"
          :items="possibleProjectTypes"
          label="Project Type")
        v-text-field(v-show="projectType == 'local'"
          label="Filepath"
          :rules="filepathRules"
          v-model="filepath")
        v-text-field(label="test")
        v-btn(type="submit" block) Create

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NewSiloForm",
  data(){
    return {
      dialog: false,
      projectType: "local",
      possibleProjectTypes: ["local", "github"],
      filepath: "",
      filepathRules: [
          v => !!v || 'Path is required',
          v => !this.filepathExists(v) || 'Path already specified in another project',
      ]
    }
  },
  computed: {
    ...mapGetters('configuration', ['selectedProjectNames', 'errorMessage']),
  },
  methods: {
    submit(){

    },
    filepathExists(value){
      for (const silo of this.$store.getters['configuration/selectedSilos']){
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