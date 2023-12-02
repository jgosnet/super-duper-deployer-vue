<template lang="pug">
v-row(justify="space-around")
  v-timeline(align="start")
    MicroSiloDetailsRsl(:silo="silo")

    MicroSiloDetailsPresets(:silo="silo")

    MicroSiloDetailsRules(:silo="silo")

    MicroSiloDetailsTestAssets(:silo="silo")

</template>

<script>
import MicroSiloDetailsRsl from "@/components/MicroSilo/Details/MicroSiloDetailsRsl";
import MicroSiloDetailsPresets from "@/components/MicroSilo/Details/MicroSiloDetailsPresets";
import MicroSiloDetailsRules from "@/components/MicroSilo/Details/MicroSiloDetailsRules";
import MicroSiloDetailsTestAssets from "@/components/MicroSilo/Details/MicroSiloDetailsTestAssets";
export default {
  name: "MicroSiloDetails",
  components: {MicroSiloDetailsTestAssets, MicroSiloDetailsRules, MicroSiloDetailsPresets, MicroSiloDetailsRsl},
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