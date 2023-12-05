<template lang="pug">
div.w-100
  //v-icon(@click="detailDialog = true" :color="iconColor" ) {{ this.iconName }}
  //| {{presetDetails.modal}}
  v-dialog(v-model="presetDetails.modal")
    template(v-slot:activator="{ props }")
    v-card(min-width="800px" )
      v-card-title
        | Preset:
        b.pl-2 {{presetDetails.name}}
      v-card-text.w-100
        div.d-flex.flex-row
          v-tabs(v-model="presetDetails.selectedSilo" direction="vertical" ).pr-5
            div
              v-tab(value="local" )
                | LOCAL
            div(v-for="silo in selectedSilos" :key="silo.name"  )
              v-tab(:value="silo.id")
                | {{silo.name}}
                v-icon(v-if="presetDetails[`status_${silo.id}`] == 'same'" color="green" ) fa-solid fa-square-check
                v-icon(v-if="presetDetails[`status_${silo.id}`] == 'missing'" color="red" ) fa-solid fa-xmark
                v-icon(v-if="presetDetails[`status_${silo.id}`] == 'different'" color="red" ) fa-solid fa-triangle-exclamation
                v-icon(v-else-if="presetDetails[`status_${silo.id}`] == 'error'" color="red" ) fa-solid fa-circle-exclamation
          v-window(v-model="presetDetails.selectedSilo" ).w-100
            div
              v-window-item(value="local")
                //| {{localPresetDetails}}
                PresetSiloLocalComparisonDetails(:preset-details="localPresetDetails" ).w-100
            div(v-for="silo in selectedSilos" :key="silo.name"  )
              v-window-item(:value="silo.id")
                //| {{presetDetails[`silo_${silo.id}`]}}
                PresetSiloLocalComparisonDetails(:preset-details="presetDetails[`silo_${silo.id}`]"
                  :is-different="presetDetails[`status_${silo.id}`] != 'same'").w-100
                //| ***{{presetDetails[`silo_${silo.id}`]}}***
                //CodeMirror.CodeMirror.py-3.w-100(v-model="presetDetails[`silo_${silo.id}`].local.preset_data"
                //  :lang="lang"
                //  :linter="linter"
                //  basic
                //)
      //v-card-actions
      //  v-spacer
      //  v-btn(color="primary" @click="$emit('closePresetDetails', this.presetDetails)") Close
</template>

<script>
import CodeMirror from 'vue-codemirror';
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
    iconColor(){
      return this.color;
    },
    iconName(){
      return this.icon;
    },
    localPresetDetails(){
      let recentPresetDetails = null;
      for (const silo of this.selectedSilos){
        console.log(silo)
        console.log(`parsing: ${silo.name}`)
        console.log(recentPresetDetails)
        if (!recentPresetDetails){
          recentPresetDetails = {
            remote:{
              modified: this.presetDetails[`silo_${silo.id}`].local.modified,
              preset_data: this.presetDetails[`silo_${silo.id}`].local.preset_data,
              config_data: this.presetDetails[`silo_${silo.id}`].local.config_data,
            }
          }
        }
      }
      console.log(recentPresetDetails)
      return recentPresetDetails;
    }
  },
  props: {
    presetDetails: Object,
    color: {
      type: String,
        default: 'blue'
    },
    icon: {
      type: String,
        default: 'fa-solid fa-circle-info'
    },
  },
  data() {
    return {
      detailDialog: false,
      lang: python(),
      linter: null,
      test: "this is python",
      selectedTab: "",
    }
  },
  methods:{

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