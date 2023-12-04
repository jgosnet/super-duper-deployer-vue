<template lang="pug">
v-container(fluid).no-border.bg-white
  h1.pb-5 Pilot silo deployment
  v-row.px-2
    v-select(v-model="selectedSilo"
        :items="selectedSilos"
        item-title="name"
        return-object=""
        label="Select a silo")

  v-row.px-4(v-if="selectedSilo" )
    PilotSiloDetails(:silo="selectedSilo")
</template>

<script>
import {mapGetters} from "vuex";
import PilotSiloDetails from "@/components/PilotSilo/PilotSiloDetails";

export default {
  name: "PilotSiloHome",
  components: {PilotSiloDetails},
  data(){
    return {
      selectedSilo: null
    }
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
  },
}
</script>

<style scoped>
.no-border{
  border-radius: 5px;
}
</style>