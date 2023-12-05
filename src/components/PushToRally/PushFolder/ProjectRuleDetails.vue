<template lang="pug">
div.w-100
  //v-icon(@click="detailDialog = true" :color="iconColor" ) {{ this.iconName }}
  //| {{ruleDetails.modal}}
  v-dialog(v-model="ruleDetails.modal")
    template(v-slot:activator="{ props }")
    v-card(min-width="800px" )
      v-card-title
        | Preset:
        b.pl-2 {{ruleDetails.name}}
      v-card-text.w-100
        div.d-flex.flex-row
          v-tabs(v-model="ruleDetails.selectedSilo" direction="vertical" ).pr-5
            div
              v-tab(value="local" )
                | LOCAL
            div(v-for="silo in selectedSilos" :key="silo.name"  )
              v-tab(:value="silo.id")
                | {{silo.name}}
                v-icon(v-if="ruleDetails[`status_${silo.id}`] == 'same'" color="green" ) fa-solid fa-square-check
                v-icon(v-if="ruleDetails[`status_${silo.id}`] == 'missing'" color="red" ) fa-solid fa-xmark
                v-icon(v-if="ruleDetails[`status_${silo.id}`] == 'different'" color="red" ) fa-solid fa-triangle-exclamation
                v-icon(v-else-if="ruleDetails[`status_${silo.id}`] == 'error'" color="red" ) fa-solid fa-circle-exclamation
          v-window(v-model="ruleDetails.selectedSilo" ).w-100
            div
              v-window-item(value="local")
                //| {{localRuleDetails}}
                PresetSiloLocalComparisonDetails(:preset-details="localRuleDetails" ).w-100
            div(v-for="silo in selectedSilos" :key="silo.name"  )
              v-window-item(:value="silo.id")
                //| {{ruleDetails[`silo_${silo.id}`]}}
                RuleSiloLocalComparisonDetails(:preset-details="ruleDetails[`silo_${silo.id}`]" ).w-100
                //| ***{{ruleDetails[`silo_${silo.id}`]}}***
                //CodeMirror.CodeMirror.py-3.w-100(v-model="ruleDetails[`silo_${silo.id}`].local.preset_data"
                //  :lang="lang"
                //  :linter="linter"
                //  basic
                //)
      //v-card-actions
      //  v-spacer
      //  v-btn(color="primary" @click="$emit('closeruleDetails', this.ruleDetails)") Close
</template>

<script>
import CodeMirror from "vue-codemirror";
import {python} from "@codemirror/lang-python";
import {mapGetters} from "vuex";

export default {
  name: "ProjectRuleDetails",
  props: {
    ruleDetails: Object,
    color: {
      type: String,
        default: 'blue'
    },
    icon: {
      type: String,
        default: 'fa-solid fa-circle-info'
    },
  },
  components:{
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
    localRuleDetails(){
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

</style>