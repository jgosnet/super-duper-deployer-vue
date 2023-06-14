<template lang="pug">
v-card(color="transparent")
  v-card-title
    v-row.py-3
      v-icon.ml-4(icon="fas fa-cloud-upload-alt")
      h2.ml-4 Import from Rally
      v-spacer
      import-from-rally-configuration
  v-card-text.w-100

    div(v-if="selectedSilos.length === 0").py-6
      span(align="center") No silos selected.
    div(v-else)
      v-card.w-100
        v-tabs(v-model="tab" bg-color="blue-grey-darken-4")
          v-tab(v-for="silo in selectedSilos" :value="silo.name")
            | {{ silo.name}}
      v-card-text(fluid).ma-0.pa-0
        v-window(v-model="tab" fluid)
          v-window-item(v-for="silo in selectedSilos"
            :key="silo.name"
            :value="silo.name")
            keep-alive
              | {{silo}}
</template>

<script>
import ImportFromRallyConfiguration from "@/components/Import/ImportFromRallyConfiguration";
import {mapGetters} from "vuex";

export default {
  name: "ImportHome",
  components: {
    ImportFromRallyConfiguration
  },
  data(){
    return {
      tab: null,
    }
  },
  computed:{
    ...mapGetters('configuration', ['selectedSilos']),
  },
}
</script>

<style scoped>

</style>