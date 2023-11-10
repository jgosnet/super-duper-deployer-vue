<template lang="pug">
div
  v-icon(@click="detailDialog = true" color="blue" ) fa-solid fa-circle-info
  v-dialog(v-model="detailDialog"
            width="auto" )
    template(v-slot:activator="{ props }")
    v-card.w-100(min-width="800px" )
      v-card-title
        | Preset:
        b.pl-2 {{presetDetails.name}}
      v-card-text
        div.d-flex.flex-row
          v-tabs(v-model="selectedTab" direction="vertical" ).pr-5
            div(v-for="silo in selectedSilos" :key="silo.name"  )
              v-tab(:value="silo.name")
                | {{silo.name}}
                v-icon(v-if="presetDetails[`status_${silo.id}`] == 'same'" color="green" ) fa-solid fa-square-check
                v-icon(v-if="presetDetails[`status_${silo.id}`] == 'missing'" color="red" ) fa-solid fa-xmark
                v-icon(v-if="presetDetails[`status_${silo.id}`] == 'different'" color="red" ) fa-solid fa-triangle-exclamation
                v-icon(v-else-if="presetDetails[`status_${silo.id}`] == 'error'" color="red" ) fa-solid fa-circle-exclamation
          v-window(v-model="selectedTab" ).w-100
            div(v-for="silo in selectedSilos" :key="silo.name"  )
              v-window-item(:value="silo.name")
                PresetSiloLocalComparisonDetails(preset-details="presetDetails[`silo_${silo.id}`]" )
                //| ***{{presetDetails[`silo_${silo.id}`]}}***
                //CodeMirror.CodeMirror.py-3.w-100(v-model="presetDetails[`silo_${silo.id}`].local.preset_data"
                //  :lang="lang"
                //  :linter="linter"
                //  basic
                //)
      v-card-actions
        v-spacer
        v-btn(color="primary" @click="detailDialog = false") Close
</template>

<script>
import CodeMirror from 'vue-codemirror6';
import {python} from "@codemirror/lang-python";
import {mapGetters} from "vuex";
import PresetSiloLocalComparisonDetails from "@/components/PushToRally/PushFolder/PresetSiloLocalComparisonDetails";

export default {
  name: "ProjectPresetDetails",
  components:{
    PresetSiloLocalComparisonDetails,
    CodeMirror
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
  },
  props: {
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
.leftpanel{
  background-color: grey;
}

.CodeMirror {
  border: 1px solid #eee;
  min-height: 500px;
  max-height: 1920px;
  text-align: left;
}
</style>