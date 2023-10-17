<template lang="pug">
v-card.pt-3.w-100
  div.d-flex.flex-row.w-100
    v-tabs(v-model="tab"
      direction="vertical"
      background-color='grey lighten-3'
    )
      v-tab(value="presets")
        v-icon.pr-2(icon="far fa-bookmark")
        | Presets

      v-tab(value="rules")
        v-icon.pr-2(icon="fas fa-cogs")
        | Rules

    v-card-text(fluid).ma-0.pa-0
      v-window(v-model="tab" fluid)
        v-window-item(value="presets" )
          RallyImportPresets

        v-window-item(value="rules" )
          RallyImportRules
</template>

<script>
import RallyImportPresets from "@/components/Import/RallyImport/RallyImportPresets";
import RallyImportRules from "@/components/Import/RallyImport/RallyImportRules";
export default {
  name: "RallyImport",
  props: {
    selectedSilo: Object,
  },
  provide(){
    return {
      selectedSilo: this.selectedSilo,
    }
  },
  components:{
    RallyImportRules,
    RallyImportPresets,
  },
  data(){
    return {
      tab: null
    }
  }
}
</script>

<style scoped>

</style>