<template lang="pug">
v-container(fluid).no-border.bg-white
  h1.pb-5 Micro silo deployment
  v-row.px-2
    v-select(v-model="selectedSilo"
        :items="selectedSilos"
        item-title="name"
        return-object=""
        label="Select a silo")

  v-row.px-4(v-if="selectedSilo" )
    MicroSiloDetails(:silo="selectedSilo")
</template>

<script>
import {mapGetters} from "vuex";
import MicroSiloDetails from "@/components/MicroSilo/MicroSiloDetails";

export default {
  name: "MicroSiloHome",
  components: {MicroSiloDetails},
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