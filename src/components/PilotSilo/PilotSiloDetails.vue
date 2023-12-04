<template lang="pug">
v-row(justify="space-around")
  v-timeline(align="start")
    PilotSiloDetailsRsl(:silo="silo")

    PilotSiloDetailsPresets(:silo="silo")

    PilotSiloDetailsRules(:silo="silo")

    PilotSiloDetailsTestAssets(:silo="silo")

</template>

<script>
import PilotSiloDetailsRsl from "@/components/PilotSilo/Details/PilotSiloDetailsRsl";
import PilotSiloDetailsPresets from "@/components/PilotSilo/Details/PilotSiloDetailsPresets";
import PilotSiloDetailsRules from "@/components/PilotSilo/Details/PilotSiloDetailsRules";
import PilotSiloDetailsTestAssets from "@/components/PilotSilo/Details/PilotSiloDetailsTestAssets";
export default {
  name: "PilotSiloDetails",
  components: {PilotSiloDetailsTestAssets, PilotSiloDetailsRules, PilotSiloDetailsPresets, PilotSiloDetailsRsl},
  props:{
    silo: Object
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>

</style>