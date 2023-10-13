<template lang="pug">
v-container(class="mx-1" fluid).preset
  v-row.mx-4.my-1
    h2.py-2.px-3.float-left(align="left") Presets
    v-btn.float-right(@click="refreshPresets()" size="x-small" icon="fa-solid fa-arrows-rotate")
  v-row
  v-data-table(
    v-model:items-per-page="itemsPerPage"
    :headers="presetHeaders"
    :items="localPresetsList"
    item-value="name"
    class="elevation-1"
    density="compact"
    :item-class="presetInSiloClass"
    color="grey-lighten-4"
    show-select
  )
    template(v-slot:item.existsInSilo="{ item }")
      div.float-left
        v-icon {{ item.existsInSilo ? "fa-solid fa-check" : "fa-solid fa-xmark" }}

    template(v-slot:item.name="{ item }")
      div.float-left
        //v-icon(color="blue" class="pr-4") fa-solid fa-circle-info
        span {{item.value }}

    template(v-for="selectedSilo in this.selectedSilos"
      v-slot:[`item.silo_${selectedSilo.name}`]="{ item }")
      div(v-if="item === 'loading'" )
        v-icon(icon="fa-solid fa-spinner")
      div(v-else)
        v-icon(v-if="item.exists_in_silo"
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

export default {
  name: "ProjectPresets",
  components:{
    VDataTable
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos']),
  },
  props: {
    presetsList: Array,
  },
  data() {
    return {
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
          this.presetHeaders.push({
          title: item.name,
          align: 'start',
          sortable: false,
          key: `silo_${item.name}`
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
          newPreset[`silo_${silo.name}`] = "loading"
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
      console.log(this.getSlotName(silo_name))
      item[this.getSlotName(silo_name)] = newStatus
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
  margin-top: 14px;
  margin-bottom: 14px;

  background-color: lightgrey;
  color: darkslategrey;
}

</style>