<template lang="pug">
v-card()
  v-card-title
    v-row.py-3
      v-icon.ml-4(icon="fas fa-cloud-upload-alt")
      h2.ml-4 Import from Rally
      v-spacer
      ConfigurationWidget
  v-card-text.w-100

    div(v-if="selectedSilos.length === 0").py-6
      span(align="center") No silos selected.
    div(v-else)
      | {{selectedSilos}}
      v-card.w-100
        v-tabs(v-model="tab" bg-color="blue-grey-darken-4" selected-class="selected-tab" )
          v-tab(v-for="silo in selectedSilos" :value="silo.name")
            | {{ silo.name}}
      v-card-text(fluid).ma-0.pa-0
        v-window(v-model="tab" fluid)
          v-window-item(v-for="silo in selectedSilos"
            :key="silo.name"
            :value="silo.name")
            keep-alive
              RallyImport
</template>

<script>
import {mapGetters} from "vuex";
import RallyImport from "@/components/Import/RallyImport/RallyImport";
import {computed} from "vue";
import ConfigurationWidget from "@/components/Configuration/ConfigurationWidget";

export default {
  name: "ImportHome",
  components: {
    ConfigurationWidget,
    RallyImport,
  },
  data(){
    return {
      tab: null,
    }
  },
  provide() {
    return {
      selectedSilo: computed(() => this.tab),
    }
  },
  computed:{
    ...mapGetters('siloConfiguration', ['selectedSilos']),
  },
  watch: {
    tab(){
      console.log(this.tab)
    }
  }
}
</script>

<style scoped>
.selected-tab{
  background-color: darkslategrey;
}
</style>