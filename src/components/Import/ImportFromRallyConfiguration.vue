<template lang="pug">
v-card
  v-card-title(class="pb-5")
    span(class="pr-2") Configuration
    v-btn(@click.stop="openDialog" icon="fas fa-edit" size="small" variant="outlined" align="left")
  v-card-text
    v-row(text-align="left")
      b(class="pr-2") Silos:
      ul.ml-4
        li(v-for="silo in selectedSiloNames" :key="silo")
          | {{silo}}

v-dialog(v-model="localDialog"
      persistent
      fullscreen
      transition="dialog-top-transition"
      @keyup.esc="closeDialog")
  template(v-slot:activator="{ props }")
  v-card
    v-toolbar(color="light-blue-darken-4")
      v-toolbar-title
        v-icon.mx-3 fa-solid fa-gears
        | Configuration
      v-spacer
      v-toolbar-items
        v-btn(variant="text" @click="closeDialog" icon="fa-solid fa-xmark")

    div(v-show="this.loading")
      v-card-text(v-show="this.loading")
        v-progress-linear(indeterminate
              color="black"
              class="mb-0")
        | Data loading..
    div(v-show="!this.loading")
      ImportConfigDetails

      v-card-actions(v-show="!this.loading")
        v-spacer
        v-btn(color="blue-darken-1"
                variant="text"
                @click="closeDialog") Close
        v-btn(color="blue-darken-1"
            variant="text"
            @click="saveConfiguration") Save

</template>

<script>
import {mapGetters} from "vuex";
import ImportConfigDetails from "@/components/Import/ImportConfigDetails";

export default {
  name: "ImportFromRallyConfiguration",
  components: {
    ImportConfigDetails
  },
  computed: {
    ...mapGetters('configuration', ['selectedProjectNames', 'selectedSiloNames']),
    show: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    computedProject(){
      return "project1"
    },
    computedSilo(){
      return "silo1"
    }
  },
  data(){
    return {
      localSelectedProject: null,
      localSelectedSilo: null,
      localDialog: false,
      loading: false,
      timeout: null,
      availableProjects: [],
    }
  },
  methods: {
    openDialog(){
      this.localDialog = true
    },
    closeDialog(){
      console.log("closing modal")
      this.localDialog = false
    },
    async submit(event){
      this.loading = true
      const results = await event
      this.loading = false
      alert(JSON.stringify(results, null, 2))
    },
    saveConfiguration(){
      console.log('trying to save cookies:')
      this.$cookies.set('selectedProjects', JSON.stringify(this.$store.getters['configuration/projectsList']));
      this.$cookies.set('selectedSilos', JSON.stringify(this.$store.getters['configuration/selectedSilos']));
      this.$cookies.set('defaultImportPath', this.$store.getters['configuration/defaultImportPath']);
      this.$store.dispatch('snackbar/showMessage', {
            message: "Configuration saved"
          }
        );
      this.closeDialog();
    }
  }
}
</script>

<style scoped>

</style>