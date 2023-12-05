<template lang="pug">
v-tabs(v-model="selectedTab").w-100
  v-tab(value="providerdata")
    | Provider Data
  v-tab(value="rallyconfig")
    | Rally Config

v-window(v-model="selectedTab" ).w-100
  div.py-2
    i Last modified date:
    b.pl-2 {{ remoteDate }}
    v-checkbox.float-right.pl-3(v-show="isDifferent"
            label="Show differences"
            v-model="showDiff" density="compact" hide-details)
  v-window-item(value="providerdata" ).w-100
    //| {{this.presetDetails.remote.config_data}}
    div(v-if="showDiff" )
      span.float-left.pt-0.mt-0 Local
      span.float-right.pt-0.mt-0 Silo data
      br.mt-0.pt-0
      code-diff(:old-string="localCode"
              :new-string="remoteCode"
              output-format="side-by-side"
      )
    div(v-else)
      codemirror.w-100.CodeMirror(
        v-model="remoteCode"
          basic
          :lang="lang"
        )
  v-window-item(value="rallyconfig" ).w-100
    codemirror.w-100.CodeMirror(v-model="remoteRallyConfig"
      basic
      :lang="lang"
    )
</template>

<script>
import CodeMirror from 'vue-codemirror';
import {python} from "@codemirror/lang-python";
import {mapGetters} from "vuex";


export default {
  name: "PresetSiloLocalComparisonDetails",
  components:{
    CodeMirror
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
    remoteDate(){
      if (this.presetDetails.remote.modified == undefined){
        return "n/a"
      }
      const modifiedDate = new Date(this.presetDetails.remote.modified);
      return modifiedDate.toLocaleString()
    },
    localCode(){
      return this.presetDetails.local.preset_data;
    },
    remoteCode(){
      return this.presetDetails.remote.preset_data;
    },
    remoteRallyConfig(){
      return this.presetDetails.remote.config_data;
    }
  },
  props:{
    presetDetails: Object,
    isDifferent: Boolean
  },
  data() {
    return {
      showDiff: false,
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
.CodeMirror {
  border: 1px solid #eee;
  min-height: 300px;
  /*max-height: 300px;*/
  text-align: left;
  margin-bottom: 10px;
}
</style>