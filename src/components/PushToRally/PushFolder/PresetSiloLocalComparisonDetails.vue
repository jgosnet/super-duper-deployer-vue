<template lang="pug">
v-tabs(v-model="selectedTab")
  v-tab(value="providerdata")
    | Provider Data
  v-tab(value="rallyconfig")
    | Rally Config

v-window(v-model="selectedTab" ).w-100
  v-window-item(value="providerdata" )
    | provider data
  v-window-item(value="rallyconfig" )
    | rallyconfig
</template>

<script>
import CodeMirror from 'vue-codemirror6';
import {python} from "@codemirror/lang-python";
import {mapGetters} from "vuex";


export default {
  name: "PresetSiloLocalComparisonDetails",
  components:{
    CodeMirror
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
  },
  props:{
    presetDetails: Object,
  },
  data() {
    return {
      detailDialog: false,
      lang: python(),
      linter: null,
      test: "this is python",
      selectedTab: "",
    }
  }
}
</script>

<style scoped>

</style>