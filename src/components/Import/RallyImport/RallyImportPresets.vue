<template lang="pug">
v-card.w-100
  v-row.mt-2.ml-2.mr-2
    v-btn.ma-2(size="small"
      @click='loadPresets()'
      prepend-icon="fas fa-sync-alt" :disabled="isLoading") refresh
    v-icon.mt-3(:icon="refreshIcon" :color="refreshColor")
    span.mt-3.ml-2 {{updateMessage}}
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
    v-btn.ml-5(@click="stopLoading = true" :disabled="stopLoading" ) {{cancellingButton}}
  v-row
    | {{this.selectedProjects}}
    div(v-show="selectedPresets.length > 0").w-100
      v-row.mb-1.pb-1.pl-3
        v-col(cols="3")
          v-btn(
            prepend-icon="fa-solid fa-file-arrow-down"
            @click="downloadSelection").ml-5 Download selection
        v-col(cols="4")
          v-text-field.pl-3(prepend-icon="fa-solid fa-folder-tree" hide-details
          clearable label="Prefix" v-model="downloadPrefix" density="compact")
        v-col(cols="4")
          v-select.pl-3.mr-2(density="compact" hide-details
            v-model="selectedImportProjects"
            label="Projects"
            return-object
            multiple
            :items="selectedProjects"
            item-title="name")
      v-row.mb-1.pb-1.pl-3
        v-col(cols="3")
        v-col(cols="4")
          v-checkbox.pl-3(label="Use existing prefix (if available)"
            v-model="useExistingPrefix" density="compact" hide-details)


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
        template(v-for="projectId in this.selectedProjectIds"
          v-slot:[`item.status_${projectId}`]="{ item }")
          div(v-if="item.value[`status_${projectId}`] === 'not found'" ).float-left
            v-icon(color="red" ) fa-solid fa-square-xmark
          div(v-else)
            span {{ item.value[`status_${projectId}`]}}


        template(v-slot:item.name="{ item }")
          span.float-left {{item.value.name}}

        template(v-slot:item.id="{ item }")
          span.float-left {{item.value.id}}

        template(v-slot:item.status="{ item }")
          v-progress-circular(v-show="item.value.status=='downloading..'" indeterminate color="primary" )

          v-icon(v-show="item.value.status=='complete'" color="green" ) fa-solid fa-file-circle-check

          div(v-show="item.value.status=='error'")
            v-tooltip(left)
              template(v-slot:activator="{ props }")
                v-icon(v-bind="props" color="red") fa-solid fa-file-circle-exclamation
              span {{item.errorDetails || "unknown error"}}

</template>

<script>
import {api} from "@/scripts/axios_config";
import {mapGetters} from "vuex";

export default {
  name: "RallyImportPresets",
  components:{
  },
  inject: ['selectedSilo'],
  data(){
    return {
      useExistingPrefix: true,
      selectedImportProjects: [],
      downloadPrefix: "",
      selectedPresets: [],
      presetInSiloClass: [],
      itemsPerPage: 10,
      isLoading: false,
      updateMessage: "Not loaded yet.",
      search: '',
      presetList: [
        // {"name": "test", "id": 1, 'provider_type': "Decision Engine", "status": "complete"},
        // {"name": "test", "id": 1, 'provider_type': "Decision Engine", "status": "complete"},
        // {"name": "test", "id": 1, 'provider_type': "Decision Engine", "status": "downloading.."},
        // {"name": "test", "id": 1, 'provider_type': "Decision Engine", "status": "error"},
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
          title: 'Provider Type',
          sortable: true,
          key: 'provider_type',
          align: 'start'
        },
        {
          title: 'Last update',
          sortable: true,
          key: 'last_update',
          align: 'start'
        },
      ],
      stopLoading: false,
    }
  },
  computed: {
    ...mapGetters('projectConfiguration', ['selectedProjectNames', 'selectedProjectIds', 'selectedProjects']),
    refreshIcon(){
      if (this.updateMessage.includes("listing presets")){
        return "fa-solid fa-spinner"
      } else if (this.updateMessage.includes("listing interrupted")){
        return "fa-solid fa-stop"
      } else if (this.updateMessage.includes("complete")){
        return "fa-solid fa-check"
      }
      return ""
    },
    refreshColor(){
      if (this.updateMessage.includes("listing presets")){
        return "blue"
      } else if (this.updateMessage.includes("listing interrupted")){
        return "red"
      } else if (this.updateMessage.includes("complete")){
        return "green"
      }
      return "grey"
    },
    cancellingButton(){
      if (this.stopLoading){
        return "Cancelling..";
      }
      return "Cancel";
    },
    siloId(){
      console.log()

      const selectedSiloConfig = this.$store.getters['siloConfiguration/selectedSilos'].find(x => x.name === this.selectedSilo.value)
      console.log("Selected silo config: ")
      console.log(this.selectedSilo.value)
      console.log(this.$store.getters['siloConfiguration/selectedSilos'])
      console.log(selectedSiloConfig)
      console.log("---")
      return selectedSiloConfig.id
    }
  },
    watch: {
    selectedProjectIds(newValue, oldValue){
      console.log(`Project selection changed: old -> ${oldValue}`);
      this.refreshPresetHeaders();
    }
  },
  methods: {
    getCurrentDate(){
      return new Date().toLocaleString();
    },
    async loadPresets() {
      this.updateMessage = `listing presets - ${this.getCurrentDate()}`
      this.presetList = [];
      this.stopLoading = false
      this.selectedPresets = [];
      this.isLoading = true;
      let url = `silo/presets/list`
      this.isLoading = true
      let finished = false
      do {
        const result = await this.getPresetsByUrl(url, this.siloId, this.selectedProjectIds)
        console.log("RESULT")
        console.log(result)
        if (this.stopLoading && result.links !== undefined && result.links.next !== undefined){
          this.updateMessage = `listing interrupted - ${this.getCurrentDate()}`
          finished = true
          this.stopLoading = false
        }
        else if (this.stopLoading ||
            result === undefined || result.links === undefined || result.links.next === undefined || result.links.next === ""){
          this.updateMessage = `Complete - ${this.getCurrentDate()}`
          finished = true
          console.log("no next link")
          this.stopLoading = false

        }
        else{
          url = result.links.next
          console.log(`next url: ${url}`)
        }
      }
      while (finished === false);
      this.isLoading = false;

    },
    async getPresetsByUrl(url, siloId, projectIds){
      const response = api.get(url, {params: {silo_id: siloId, project_ids: projectIds.join(',')}})
          .then((response) => {
            console.log("DATA")
            console.log(response.data)
            response.data.downloaded.forEach((x) => {
              console.log(x);
              let newRes = {
                name: x.name,
                id: x.id,
                provider_type: x.provider_type,
                last_update: new Date(x.last_update).toLocaleString(),
              }
              for (const projectItem of this.selectedProjects){
                newRes[`status_${projectItem.id}`] = x.project_id_comparisons[projectItem.id]
              }
              this.presetList.push(newRes);
            });
            return response.data
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            console.log(`${url} is complete`)
          })
      this.presetLoadingPromise = response
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
    refreshPresetHeaders(){
      this.headers = this.headers.filter(obj => {
        console.log(`checking: ${obj.key}`)
        if (!obj.key.startsWith('status_')){
          return true;
        }
        const searchedId = obj.key.replaceAll("status_", "");
        if (this.selectedProjectIds.includes(searchedId)){
          console.log(`value ${searchedId} found in selected projects`)
          return true;
        }
        console.log(`field not found, deleting: ${obj.key}`)
        return false;
      });
      // parse every included project id:
      for (const projectItem of this.selectedProjects){
        console.log('checking if project status is available:')
        console.log(projectItem)
        console.log(this.headers)
        if (this.headers.filter(obj => obj.key === `status_${projectItem.id}`)){
          this.headers.push({
          title: `Status (${projectItem.name})`,
          sortable: true,
          key: `status_${projectItem.id}`,
          align: 'end'
        })
        } else{
          console.log('project item already included')
          console.log(projectItem)
        }
      }
    },
  },
  mounted() {
    this.refreshPresetHeaders();
  }
}
</script>

<style scoped>

</style>