<template lang="pug">
v-container(class="mx-1" fluid).rule.ml-5
  v-icon.pt-3.float-right(@click="this.showContainer = !this.showContainer" size="large" ) {{showContainerIcon}}
  v-row.mx-4.my-1
    h3.py-2.px-3.float-left(align="left" @click="this.showContainer = !this.showContainer") Rules
    span.py-2.pr-5 {{this.rulesCount}}
    v-btn(@click="refreshRules()" size="x-small" icon="fa-solid fa-arrows-rotate")

    div(v-if="this.selectedRules.length > 0 && this.showContainer" )
      v-btn.ml-3(prepend-icon="fa-solid fa-file-arrow-down" @click="uploadDialog = true"
      :disabled="this.preSelectedSilos.length == 0").ml-5 Push selection
      div(v-show="this.preSelectedSilos.length == 0" )
        span.text-red() Please select a silo first
      v-dialog(v-model="uploadDialog"
            width="auto"
            min-width="500" )
        template(v-slot:activator="{ props }")
        v-card
          v-card-title
            | Push rules to
            b.pl-2 {{formattedSiloSelection}}
          v-card-text
            | You 'bout to push some rules to a silo mate, ya sure 'bout dat ?
            ul
              li(v-for="item in this.selectedRules" :key="item.id")
                | {{item.name}}
          v-card-actions
            v-spacer
            v-btn(color="primary" @click="uploadDialog = false") Cancel
            v-btn(color="primary"  @click="uploadSelection") Confirm

  v-data-table(v-show="this.showContainer"
    v-model:items-per-page="itemsPerPage"
    v-model="selectedRules"
    :headers="ruleHeaders"
    :items="localRulesList"
    item-value="name"
    class="elevation-1"
    density="compact"
    :item-class="ruleInSiloClass"
    color="grey-lighten-4"
    show-select
    return-object
  )

    template(v-slot:item.existsInSilo="{ item }")
      div.float-left
        //| --{{item}}--
        v-icon(v-if="item.existsInSilo === undefined" ) fa-solid fa-question
        v-icon(v-else-if="!item.existsInSilo" ) fa-solid fa-xmark
        v-icon(v-else) fa-solid fa-check

    template(v-slot:item.name="{ item }")
      div.float-left
        //v-icon(color="blue" class="pr-4") fa-solid fa-circle-info
        //ProjectPresetDetails.float-left.pr-2(:presetDetails="item.value" )
        | {{item.value.name }}



    template(v-for="selectedSilo in this.selectedSilos"
      v-slot:[`item.silo_${selectedSilo.id}`]="{ item }")

      ProjectPresetDetails.pr-2(@close="closePresetDetails(item.value.id)"
        :presetDetails="item.value")

      div(v-if="item.value[`status_${selectedSilo.id}`] === 'downloading' || !item.value[`status_${selectedSilo.id}`]" )
        | -{{item.value[`status_${selectedSilo.id}`]}}-
        v-progress-circular(indeterminate color="blue" size="small" )
        //v-icon(icon="fa-solid fa-spinner" color="blue" )
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'complete' || item.value[`status_${selectedSilo.id}`] === 'same'" )
        //| {{item.value}}
        v-icon(color="green" icon="fa-solid fa-square-check"
          @click.prevent="openPresetDetails(item.value, selectedSilo.id)")
        //ProjectPresetDetails.pr-2(:presetDetails="item.value"
        //      icon="fa-solid fa-square-check" color="green")
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'duplicate'" )
        v-icon(icon="fa-solid fa-paste" color="red"
          @click.prevent="openPresetDetails(item.value)")
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'updated'" )
        v-icon(icon="fa-solid fa-file-export" color="blue" )
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'error'" )
        v-tooltip(activator="parent" location="top") Failed to push
          template(v-slot:activator="{ on, attrs }")
            v-icon(icon="fa-solid fa-circle-exclamation" color="red"
              @click.prevent="openPresetDetails(item.value, selectedSilo.id)")
            //ProjectPresetDetails.pr-2(:presetDetails="item.value"
            //  )

      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'different'" )
        //| -{{item.value[`silo_${selectedSilo.id}`]}}-
        //| +{{item.value[`status_${selectedSilo.id}`]}}+
        v-tooltip(activator="parent" location="top")
          div
            | Preset config:
            v-icon(v-if="!item.value[`silo_${selectedSilo.id}`].preset_data_diff" icon="fa-solid fa-square-check" color="green" )
            v-icon(v-else icon="fa-solid fa-triangle-exclamation" color="red" )
            br
            | Rally config:
            v-icon(v-if="!item.value[`silo_${selectedSilo.id}`].config_data_diff" icon="fa-solid fa-square-check" color="green" )
            v-icon(v-else icon="fa-solid fa-triangle-exclamation" color="red" )
          template(v-slot:activator="{ on, attrs }")
            //ProjectPresetDetails.pr-2(:presetDetails="item.value"
            //  icon="fa-solid fa-triangle-exclamation" color="orange")
            v-icon(icon="fa-solid fa-triangle-exclamation" color="orange"
              @click.prevent="openPresetDetails(item.value, selectedSilo.id)")

      div(v-else)
        //| --{{item.value[`status_${selectedSilo.id}`]}}--
        v-icon(v-if="item.value[`silo_${selectedSilo.id}`].exists_in_silo"
          icon="fa-regular fa-square-check"
          color="green" )
        div(v-else)
          v-tooltip(activator="parent" location="top") Missing preset on {{selectedSilo.name}}.
            template(v-slot:activator="{ on, attrs }")
              v-icon(icon="fa-solid fa-xmark"
                color="red" )

    //div(v-for="selectedSilo in this.selectedSilos" :key="selectedSilo.id")
    //  | {{getSlotName(selectedSilo.name)}}

</template>

<script>
import {VDataTable} from "vuetify/lib/labs/VDataTable";
import {mapGetters} from "vuex";
import {api} from "@/scripts/axios_config";

export default {
  name: "ProjectRules",
  props: {
    rulesList: Array,
  },
  data() {
    return {
      showContainer: true,
      uploadDialog: false,
      selectedRules: [],
      itemsPerPage: 5,
      baseHeaders: [
        {
          title: 'name',
          align: 'start',
          sortable: false,
          key: 'name'
        },
        {
          title: 'id',
          align: 'start',
          sortable: false,
          key: 'id'
        }
      ],
      ruleHeaders: [],
      localRulesList: []
    }
  },
  watch: {
    selectedSilos(newValue, oldValue){
      console.log(`Silo selection changed: old -> ${oldValue}`);
      this.refreshRuleHeaders();
    },
    rulesList(newValue, oldValue){
      console.log(`rulesList changed: old -> ${oldValue}`);
      this.refreshRules();
    },
  },
  components:{
    VDataTable
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
    formattedSiloSelection(){
      return `[${this.preSelectedSilos.join(", ")}]`
    },
    showContainerIcon(){
      if (this.showContainer){
        return "fa-solid fa-caret-right"
      }
      return "fa-solid fa-caret-down"
    },
    rulesCount(){
      if (this.showContainer){
        return ""
      }
      return `(${this.rulesList.length})`
    }
  },
  methods:{
    ruleInSiloClass(item){
      console.log(`status`)
      return item.existsInSilo ? "in-silo" : "not-in-silo"
    },
    refreshRules(){
      this.refreshRuleHeaders();
      this.loadRulesList()
    },
    refreshRuleHeaders(){
      this.ruleHeaders = this.getBaseRuleHeaders()
      if (this.selectedSilos === null || this.selectedSilos.length === 0){
        console.log('empty silo selection')
      }
      for (const item of this.selectedSilos){
        console.log(`detected: `)
        console.log(item)
        if (this.ruleHeaders.find(obj => obj.key === `silo_${item.name}`) === undefined){
          console.log(`Adding header: ${item.name} silo_${item.id}`)
          this.ruleHeaders.push({
            title: item.name,
            align: 'start',
            sortable: false,
            key: `silo_${item.id}`
          })
        }
      }
      // Delete silos not selected]
      let headersToDelete = []
      for (const item of this.ruleHeaders){
        console.log(`Parsing: ${item.key} - ${item.title}`)
        console.log(item)
        if (item.key.startsWith('silo_') && this.selectedSilos.find(obj => obj.name == item.title) === undefined){
          headersToDelete.push(item.key)
        }
      }
      this.ruleHeaders = this.ruleHeaders.filter(obj => !headersToDelete.includes(obj.key))
    },
    loadRulesList(){
      this.localRulesList = []

      for (const item of this.rulesList){
        console.log('preset found: ')
        console.log(item)
        let newRule = {
          name: item.name,
          id: item.id,
          key: item.name,
          type: item['type'],
          extension: item.ext,
          lastModified: item['modified'],
        }
        for (const silo of this.selectedSilos){
          newRule[`silo_${silo.id}`] = "loading"
          this.updateRuleStatus(newRule.id, silo.name, silo.id)
          // newPreset[`silo_${silo.name}`] = test_resp
          // console.log(`resp => ${test_resp}`)
        }

        this.localRulesList.push(newRule)
      }
    },
    async updateRuleStatus(item_id, silo_name, silo_id) {
      console.log("starting wait: " + item_id)
      let payload = {
          preset_id: item_id,
          silo_id: silo_id
        }

      const newStatus = await this.$store.dispatch('project/updateRuleStatus', payload);
      console.log("complete: " + item_id)
      console.log(`new status = `)
      console.log(newStatus)
      let item = this.localRulesList.find(obj => obj.id == item_id)
      console.log(this.getSlotName(silo_id))
      item[this.getSlotName(silo_id)] = newStatus
      if (!newStatus.exists_in_silo){
        item[`status_${silo_id}`] = "missing"
      } else{
        if (newStatus.config_data_diff || newStatus.preset_data_diff){
          item[`status_${silo_id}`] = "different"
        } else{
          item[`status_${silo_id}`] = "same"
        }
      }
      console.log("wait ended")
    },
    getSlotName(name){
      return `silo_${name}`
    },
    getBaseRuleHeaders(){
      let newRuleList = []
      for (const item of this.baseHeaders){
        newRuleList.push(item)
      }
      return newRuleList
    },
        closePresetDetails(item){
      item['modal'] = false;
    },
    openPresetDetails(item, silo_name){
        item['modal'] = true;
        item.selectedSilo = silo_name;
    },
    async uploadSelection(){
      // set the parameters
      const currentSelection = this.selectedRules;
      for (const item of currentSelection){
        console.log(item);
        console.log(this.preSelectedSilos);
        for (const currentSilo of this.preSelectedSilos){
          console.log(`pushing to silo: ${currentSilo}`)
          const currentSiloId = this.selectedSilos.find(obj => obj.name === currentSilo).id
          console.log("currentSiloId: ")
          console.log(currentSiloId)
          this.uploadRuleBySilo(this.localRulesList.find(obj => obj.id === item.id), currentSiloId);
        }
      }
      this.$store.dispatch('snackbar/showMessage', {
            message: "Push request complete"
          },
          { root: true }
      )
      this.uploadDialog = false;
      this.selectedPresets = [];
    },
    async uploadRuleBySilo(item, siloId) {
      console.log(`downloading preset ${item} for project: ${siloId}`)
      console.log(`status_${siloId}`)
      item[`status_${siloId}`] = "downloading"

      const url = `silo/rules/upload`
      console.log(url, api)
      api.post(url, [
        {
          "silo_id": siloId,
          "project_file_id": item.id,
        }
      ])
          .then(() => {
            item[`status_${siloId}`] = "updated"
          })
          .catch((error) => {
            console.log(error)
            item[`status_${siloId}`] = "error"
          })
          .finally(() => {
            console.log(`Download attempt complete for ${item}`)
          })

    },
  },
  mounted() {
    console.log(`loaded headers: `);
    console.log(this.ruleHeaders);
    this.refreshRuleHeaders();
    this.loadRulesList();
  }
}
</script>

<style scoped>
.not-in-silo {
  background-color: grey;
}

.in-silo {
  background-color: lightgreen;
}

.rule{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  margin-left: 5px;
  margin-top: 14px;
  margin-bottom: 14px;

  background-color: #ffeee6;
  border-style: dashed;
  border-width: 1px;
  border-radius: 5px;
  color: darkslategrey;
}
</style>