<template lang="pug">
v-btn.ml-3(icon="fas fa-plus" @click="dialog = true")
v-dialog(v-model="dialog"
      transition="dialog-top-transition"
      width="auto"
      min-width="500" )
  template(v-slot:activator="{ props }")
  v-card
    v-card-title Add new project
    v-card-text
      v-form.mt-0(@submit.prevent="submit"
                        v-model="isFormValid")
        v-text-field(label="Name"
          v-model="name"
          :rules="nameRules")
        v-select(v-model="projectType"
          :items="possibleProjectTypes"
          label="Project Type")
        v-text-field(v-show="projectType == 'local'"
          label="Filepath"
          :rules="filepathRules"
          v-model="filepath")
        v-btn(type="submit"
          block
          :disabled="!isFormValid"
          variant="outlined") Create

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NewProjectForm",
  data(){
    return {
      dialog: false,
      isFormValid: false,
      name: "",
      nameRules: [
          v => !!v || 'Name is required',
          v => !this.nameExists(v) || 'Name already used by another project',
      ],
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
      console.log(`STATUS OF VALIDATION: ${this.isFormValid}`)
      var payload = {
        name: this.name,
        project_type: this.projectType,
        local_path: this.filepath
      }
      this.$store.dispatch('configuration/addNewProject', payload)
    },
    filepathExists(value){
      for (const project of this.$store.getters['configuration/selectedProjects']){
        console.log(project.path)
        if (project.path === value){
          return true
        }
      }
      return false
    },
    nameExists(value){
      for (const project of this.$store.getters['configuration/selectedProjects']){
        console.log(project.name)
        if (project.name === value){
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