<template lang="pug">
v-card.w-100
  v-row.mt-2.ml-2.mr-2
    v-btn.ma-2(size="small"
      @click='loadPresets()'
      prepend-icon="fas fa-sync-alt") refresh
    v-spacer
    v-text-field.mr-2(
      v-model='search'
      label='Search'
      outlined
      append-icon='fas fa-search'
      min-width="200px"
    )
  v-row(v-if="this.isLoading")
    v-progress-circular.ml-5(v-show="this.isLoading" indeterminate
    color="primary")
    span.pl-5.pt-2 Loading..
  v-row
    v-btn(v-show="selectedPresets.length > 0"
      prepend-icon="fa-solid fa-file-arrow-down"
      @click="downloadSelection").ml-5 Download selection
    v-container.mx-1(fluid)
      v-data-table(
        v-model="selectedPresets"
        return-object
        show-select
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="presetList"
        item-value="id"
        class="elevation-1"
        density="compact"
        color="grey-lighten-4"
        :search="search"
      )
        template(v-slot:item.name="{ item }")
          span.float-left {{item.value.name}}

        template(v-slot:item.id="{ item }")
          span.float-left {{item.value.id}}

        template(v-slot:item.status="{ item }")
          v-progress-circular(v-show="item.value.status=='downloading..'" indeterminate color="primary" )
          v-icon(v-show="item.value.status=='complete'" color="green" ) fa-solid fa-file-circle-check
          v-icon(v-show="item.value.status=='error'" color="red" ) fa-solid fa-xmark


</template>

<script>
import {api} from "@/scripts/axios_config";

export default {
  name: "RallyImportPresets",
  components:{
  },
  inject: ['selectedSilo'],
  data(){
    return {
      selectedPresets: [],
      presetInSiloClass: [],
      itemsPerPage: 100,
      isLoading: false,
      search: '',
      presetList: [
        {"name": "test", "id": 1}
      ],
      headers: [
        {
          title: 'name',
          sortable: true,
          key: 'name',
          align: 'start'
        },
        {
          title: 'id',
          sortable: true,
          key: 'id',
          align: 'start'
        },
        {
          title: 'status',
          sortable: true,
          key: 'status',
          align: 'end'
        }
      ],
    }
  },
  computed: {
    siloId(){
      console.log()

      const selectedSiloConfig = this.$store.getters['configuration/selectedSilos'].find(x => x.name === this.selectedSilo.value)
      console.log("Selected silo config: ")
      console.log(this.selectedSilo.value)
      console.log(this.$store.getters['configuration/selectedSilos'])
      console.log(selectedSiloConfig)
      console.log("---")
      return selectedSiloConfig.id
    }
  },
  methods: {
    async loadPresets() {
      this.presetList = [];
      this.isLoading = true;
      let url = `silo/presets/download?silo_id=${this.siloId}`
      this.isLoading = true
      let finished = true
      do {
        const result = await this.getPresetsByUrl(url)
        console.log("RESULT")
        console.log(result)
        if (result.links.next !== undefined && result.links.next !== "") {
          url = result.links.next
          console.log(`next url: ${url}`)
          finished = false
        }
      }
      while (finished === false);
    },
    async getPresetsByUrl(url){
      const response = api.get(url)
          .then((response) => {
            console.log("DATA")
            console.log(response.data)
            response.data.downloaded.forEach((x) => {
              console.log(x);
              this.presetList.push(x);
            });
            return response.data
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            console.log(`${url} is complete`)
          })
      return response
    },
    downloadPresetByItem(item) {
      console.log("downloading preset:")
      console.log(item)
      item.status = "downloading.."

      const url = "/"
      api.get(url)
          .then(() => {
            item.status = "complete"
          })
          .catch((error) => {
            console.log(error)
            item.status = "error"
          })
          .finally(() => {
            console.log(`Download attempt complete for ${item}`)
          })
    },
    async downloadSelection(){
      const currentSelection = this.selectedPresets;
      for (const item of currentSelection){
        console.log(item);
        this.downloadPresetByItem(item);
      }
    },

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>