<template lang="pug">
v-container(class="mx-1" fluid).preset.ml-5
  //| {{selectedSilos}}
  v-row.mx-4.my-1
    h2.py-2.px-3.float-left(align="left") Presets
    v-btn.float-right(@click="refreshPresets()" size="x-small" icon="fa-solid fa-arrows-rotate")
    div(v-if="this.selectedPresets.length > 0" )
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
            | Push presets to
            b.pl-2 {{formattedSiloSelection}}
          v-card-text
            | You 'bout to push some presets to a silo mate, ya sure 'bout dat ?
            ul
              li(v-for="item in this.selectedPresets" :key="item.id")
                | {{item.name}}
          v-card-actions
            v-spacer
            v-btn(color="primary" @click="uploadDialog = false") Cancel
            v-btn(color="primary"  @click="uploadSelection") Confirm
  v-row
  v-data-table(
    v-model:items-per-page="itemsPerPage"
    v-model="selectedPresets"
    :headers="presetHeaders"
    :items="localPresetsList"
    item-value="name"
    class="elevation-1"
    density="compact"
    :item-class="presetInSiloClass"
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
        ProjectPresetDetails.float-left.pr-2(:presetDetails="item.value" )
        | {{item.value.name }}


    template(v-for="selectedSilo in this.selectedSilos"
      v-slot:[`item.silo_${selectedSilo.id}`]="{ item }")
      div(v-if="item.value[`status_${selectedSilo.id}`] === 'downloading' || !item.value[`status_${selectedSilo.id}`]" )
        v-progress-circular(indeterminate color="blue" size="small" )
        //v-icon(icon="fa-solid fa-spinner" color="blue" )
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'complete' || item.value[`status_${selectedSilo.id}`] === 'same'" )
        v-icon(icon="fa-solid fa-square-check" color="green" )
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'duplicate'" )
        v-icon(icon="fa-solid fa-paste" color="red" )
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'updated'" )
        v-icon(icon="fa-solid fa-file-export" color="blue" )
      div(v-else-if="item.value[`status_${selectedSilo.id}`] === 'error'" )
        v-tooltip(activator="parent" location="top") Failed to push
          template(v-slot:activator="{ on, attrs }")
            v-icon(icon="fa-solid fa-circle-exclamation" color="red" )

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
            v-icon(icon="fa-solid fa-triangle-exclamation" color="orange" )

      div(v-else)
        | --{{item.value[`status_${selectedSilo.id}`]}}--
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
import { VDataTable } from 'vuetify/labs/VDataTable'

import {mapGetters} from "vuex";
import {api} from "@/scripts/axios_config";
import ProjectPresetDetails from "@/components/PushToRally/PushFolder/ProjectPresetDetails";

export default {
  name: "ProjectPresets",
  components:{
    ProjectPresetDetails,
    VDataTable
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
    formattedSiloSelection(){
      return `[${this.preSelectedSilos.join(", ")}]`
    }
  },
  props: {
    presetsList: Array,
  },
  data() {
    return {
      uploadDialog: false,
      selectedPresets: [],
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
      presetHeaders: [],
      localPresetsList: []
    }
  },
  watch: {
    selectedSilos(newValue, oldValue){
      console.log(`Silo selection changed: old -> ${oldValue}`);
      this.refreshPresetHeaders();
    }
  },
  methods: {
    async uploadSelection(){
      // set the parameters
      const currentSelection = this.selectedPresets;
      for (const item of currentSelection){
        console.log(item);
        console.log(this.preSelectedSilos);
        for (const currentSilo of this.preSelectedSilos){
          console.log(`pushing to silo: ${currentSilo}`)
          const currentSiloId = this.selectedSilos.find(obj => obj.name === currentSilo).id
          console.log("currentSiloId: ")
          console.log(currentSiloId)
          this.uploadPresetBySilo(this.localPresetsList.find(obj => obj.id === item.id), currentSiloId);
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
    async uploadPresetBySilo(item, siloId) {
      console.log(`downloading preset ${item} for project: ${siloId}`)
      console.log(`status_${siloId}`)
      item[`status_${siloId}`] = "downloading"

      const url = `silo/presets/upload`
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
    getSlotName(name){
      return `silo_${name}`
    },
    presetInSiloClass(item){
      console.log(`status`)
      return item.existsInSilo ? "in-silo" : "not-in-silo"
    },
    refreshPresetHeaders(){
      this.presetHeaders = this.getBasePresetHeaders()
      if (this.selectedSilos === null || this.selectedSilos.length === 0){
        console.log('empty silo selection')
      }
      for (const item of this.selectedSilos){
        console.log(`detected: `)
        console.log(item)
        if (this.presetHeaders.find(obj => obj.key === `silo_${item.name}`) === undefined){
          console.log(`Adding header: ${item.name} silo_${item.id}`)
          this.presetHeaders.push({
          title: item.name,
          align: 'start',
          sortable: false,
          key: `silo_${item.id}`
        })
        }
      }
      // Delete silos not selected]
      let headersToDelete = []
      for (const item of this.presetHeaders){
        console.log(`Parsing: ${item.key} - ${item.title}`)
        console.log(item)
        if (item.key.startsWith('silo_') && this.selectedSilos.find(obj => obj.name == item.title) === undefined){
          headersToDelete.push(item.key)
        }
      }
      this.presetHeaders = this.presetHeaders.filter(obj => !headersToDelete.includes(obj.key))
    },
    refreshPresets(){
      this.refreshPresetHeaders();
      this.loadPresetsList()
    },
    refreshPresetStatus(presetItem){
      // Clear existing silo data status
      for (const item_key of presetItem){
        if (item_key.startsWith('silo_') !== undefined){
          presetItem[item_key] = ""
        }
      }
      for (const silo of this.selectedSilos){
        presetItem[`silo_${silo.name}`] = "loading"
        this.updatePresetStatus(presetItem.key, silo.name)
      }
    },
    getBasePresetHeaders(){
      let newPresetList = []
      for (const item of this.baseHeaders){
        newPresetList.push(item)
      }
      return newPresetList
    },
    loadPresetsList(){
      this.localPresetsList = []

      for (const item of this.presetsList){
        console.log('preset found: ')
        console.log(item)
        let newPreset = {
          name: item.name,
          id: item.id,
          key: item.name,
          type: item['type'],
          extension: item.ext,
          lastModified: item['modified'],
        }
        for (const silo of this.selectedSilos){
          newPreset[`silo_${silo.id}`] = "loading"
          this.updatePresetStatus(newPreset.id, silo.name, silo.id)
          // newPreset[`silo_${silo.name}`] = test_resp
          // console.log(`resp => ${test_resp}`)
        }

        this.localPresetsList.push(newPreset)
      }
    },
    async updatePresetStatus(item_id, silo_name, silo_id) {
      console.log("starting wait: " + item_id)
      let payload = {
          preset_id: item_id,
          silo_id: silo_id
        }

      const newStatus = await this.$store.dispatch('project/updatePresetStatus', payload);
      console.log("complete: " + item_id)
      console.log(`new status = `)
      console.log(newStatus)
      let item = this.localPresetsList.find(obj => obj.id == item_id)
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
  },

  mounted() {
    console.log(`loaded headers: `);
    console.log(this.presetHeaders);
    this.refreshPresetHeaders();
    this.loadPresetsList();
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

.preset{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  margin-left: 5px;
  margin-top: 14px;
  margin-bottom: 14px;

  background-color: #F8F9F9;
  border-style: dashed;
  border-width: 2px;
  border-radius: 5px;
  color: darkslategrey;
}

</style>