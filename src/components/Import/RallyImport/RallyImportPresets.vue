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
    //| {{this.selectedSilo}}
    div(v-show="selectedPresets.length > 0").w-100
      v-row.mb-1.py-0.pl-3
        v-col(cols="3").py-0
          v-btn(
            prepend-icon="fa-solid fa-file-arrow-down"
            @click="downloadSelection" :disabled="this.selectedImportProjects.length == 0").ml-5 Download selection
          div(v-show="this.selectedImportProjects.length == 0" )
            span.text-red Please select a project first
        v-col(cols="4").py-0
          v-text-field.pl-3(prepend-icon="fa-solid fa-folder-tree" hide-details
          clearable label="Prefix" v-model="downloadPrefix" density="compact")
        v-col(cols="4").py-0
          v-select.pl-3.mr-2(density="compact" hide-details
            v-model="selectedImportProjects"
            label="Projects"
            return-object
            multiple
            :items="selectedProjects"
            item-title="name")
      v-row.mb-1.py-0.pl-3
        v-col(cols="3").py-0
        v-col(cols="4").py-0
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
            v-tooltip(activator="parent" location="top")
              div
                | Missing from project
              template(v-slot:activator="{ on, attrs }")
                v-icon(color="red" ) fa-solid fa-square-xmark

          div(v-else-if="item.value[`status_${projectId}`] === 'different'" ).float-left
            v-tooltip(activator="parent" location="top")
              div
                | Different
              template(v-slot:activator="{ on, attrs }")
                v-icon(color="orange" ) fa-solid fa-triangle-exclamation
          div(v-else-if="item.value[`status_${projectId}`] === 'duplicate'" ).float-left
            v-tooltip(activator="parent" location="top")
              div
                | Duplicates found
              template(v-slot:activator="{ on, attrs }")
                v-icon(color="orange" ) fa-solid fa-paste
                //v-icon(color="red" ) fa-solid fa-clone

          div(v-else-if="item.value[`status_${projectId}`] === 'downloading..'").float-left
            v-progress-circular(indeterminate color="primary" )

          div(v-else-if="item.value[`status_${projectId}`] === 'complete'\
              || item.value[`status_${projectId}`] === 'same'").float-left
            v-icon(color="green" ) fa-solid fa-file-circle-check

          div(v-else-if="item.value[`status_${projectId}`] === 'imported'").float-left
            v-tooltip(activator="parent" location="top")
              div
                | Imported
              template(v-slot:activator="{ on, attrs }")
                v-icon(color="blue" ) fa-solid fa-file-import

          div(v-else-if="item.value[`status_${projectId}`] === 'error'").float-left
            v-tooltip(left)
              template(v-slot:activator="{ props }")
                v-icon(v-bind="props" color="red") fa-solid fa-file-circle-exclamation
              span {{item.errorDetails || "unknown error"}}

          div(v-else)
            v-tooltip(activator="parent" location="top")
              div
                | Unknown status {{item.value[`status_${projectId}`]}}
              template(v-slot:activator="{ on, attrs }")
                v-icon(color="blue" ) fa-solid fa-question




        template(v-for="projectId in this.selectedProjectIds"
          v-slot:[`item.prefix_${projectId}`]="{ item }")
          div.float-left
            div(v-show="item.value[`prefix_${projectId}`].length == 1" )
              span.pr-2 {{showPrefix(item.value[`prefix_${projectId}`][0])}}
            div(v-show="item.value[`prefix_${projectId}`].length > 1" )
              span.pr-2 ({{item.value[`prefix_${projectId}`].length}})
              v-tooltip(left)
                template(v-slot:activator="{ props }")
                  v-icon(v-bind="props" color="blue") fa-solid fa-folder-tree
                div
                  div(v-for="linePrefix in item.value[`prefix_${projectId}`]")
                    | {{linePrefix.path || '/'}}:
                    b.pl-2 {{linePrefix.status || 'n/a'}}
                    v-icon(v-if="linePrefix.status == different" color="red") fa-solid fa-file-circle-exclamation
                    v-icon(v-if="linePrefix.status == same" color="green") fa-solid fa-file-circle-check
            //template(v-slot:activator="{ props }")
            //  v-icon(v-bind="props" color="blue")
            //span test

            //


        template(v-slot:item.name="{ item }")
          span.float-left {{item.value.name}}

        template(v-slot:item.id="{ item }")
          span.float-left {{item.value.id}}

        template(v-slot:item.status="{ item }")


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
          align: 'start',
          width: '20px',
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
    }
  },
  watch: {
    selectedProjectIds(newValue, oldValue){
      console.log(`Project selection changed: old -> ${oldValue}`);
      this.refreshPresetHeaders();
      this.updateMessage = `Project list changed - ${this.getCurrentDate()}`;
      this.presetList = [];
    }
  },
  methods: {
    showPrefix(prefixDict){
      if (prefixDict !== undefined){
        return prefixDict.path
      }
      return ''
    },
    getCurrentDate(){
      return new Date().toLocaleString();
    },
    async loadPresets() {

      this.presetList = [];
      this.stopLoading = false
      this.selectedPresets = [];
      this.isLoading = true;
      // first step: refresh the project
      this.updateMessage = `refreshing projects.. (This can take a while for larger projects)`
      await this.refreshProjects(this.selectedProjectIds);

      this.updateMessage = `listing presets - ${this.getCurrentDate()}`
      let url = `silo/presets/list`
      this.isLoading = true
      let finished = false
      do {
        const result = await this.getPresetsByUrl(url, this.selectedSilo.id, this.selectedProjectIds)
        if (this.stopLoading && result.links !== undefined && result.links.next !== undefined){
          this.updateMessage = `listing interrupted - ${this.getCurrentDate()}`
          finished = true
          this.stopLoading = false
        }
        else if (this.stopLoading ||
            result === undefined || result.links === undefined || result.links.next === undefined || result.links.next === ""){
          this.updateMessage = `Complete - ${this.getCurrentDate()}`
          finished = true
          this.stopLoading = false

        }
        else{
          url = result.links.next
        }
      }
      while (finished === false);
      this.isLoading = false;

    },
    async refreshProjects(projectIds){
      for (const projectId of projectIds){
        const url = `/project/${projectId}`
        await api.get(url)
          .then(() => {
          })
          .catch((

          ) => {
          })
          .finally(() => {
          })
      }
    },
    async getPresetsByUrl(url, siloId, projectIds){
      let paramsData = {params: {silo_id: siloId, project_ids: projectIds.join(',')}}
      const response = api.get(url, paramsData)
          .then((response) => {
            response.data.downloaded.forEach((x) => {
              let newRes = {
                name: x.name,
                id: x.id,
                provider_type: x.provider_type,
                last_update: new Date(x.last_update).toLocaleString(),
              }
              for (const projectItem of this.selectedProjects){
                newRes[`${projectItem.id}`] = x.projects_data[projectItem.id]
                newRes[`prefix_${projectItem.id}`] = x.projects_data[projectItem.id].prefixes
                newRes[`status_${projectItem.id}`] = x.projects_data[projectItem.id].status
              }
              this.presetList.push(newRes);
            });
            return response.data
          })
          .catch(() => {
          })
          .finally(() => {
          })
      this.presetLoadingPromise = response
      return response
    },

    async downloadPresetByProject(item, projectId, prefix) {
      item[`status_${projectId}`] = "downloading.."

      const url = `silo/${this.selectedSilo.id}/download/${projectId}/presets/${item.id}`
      await api.get(url, {params: {prefix: prefix}})
          .then(() => {
            item[`status_${projectId}`] = "imported"
          })
          .catch((error) => {
            console.log(error)
            item[`status_${projectId}`] = "error"
          })
          .finally(() => {
            console.log(`Download attempt complete for ${item}`)
          })

    },
    async downloadSelection(){
      // set the parameters
      const definedPrefix = this.downloadPrefix;
      const useExistingPrefix = this.useExistingPrefix;
      const destinationProjects = this.selectedImportProjects;
      const currentSelection = this.selectedPresets;
      for (const item of currentSelection){
        for (const project of destinationProjects){
          let projectPrefix = definedPrefix;
          if (useExistingPrefix && item[project.id].prefixes.length > 0){
            // eslint-disable-next-line no-unused-vars
            projectPrefix = item[project.id].prefixes[0].path;
          }
          if (!projectPrefix.startsWith("/")){
            projectPrefix = `/${projectPrefix}`
          }
          this.downloadPresetByProject(item, project.id, projectPrefix);
          this.$store.dispatch('snackbar/showMessage', {
                message: "Download request complete"
              },
              { root: true }
          )
        }

      }
    },
    refreshPresetHeaders(){
      this.headers = this.headers.filter(obj => {
        if (!obj.key.startsWith('status_') && !obj.key.startsWith('prefix_')){
          return true;
        }
        const searchedId = obj.key.replaceAll("status_", "");
        if (this.selectedProjectIds.includes(searchedId)){
          return true;
        }
        const searchedIdPrefix = obj.key.replaceAll("prefix_", "");
        if (this.selectedProjectIds.includes(searchedIdPrefix)){
          return true;
        }
        return false;
      });
      // parse every included project id:
      for (const projectItem of this.selectedProjects){
        if (this.headers.filter(obj => obj.key === `status_${projectItem.id}`).length === 0){
          this.headers.push({
            title: `Status (${projectItem.name})`,
            sortable: true,
            key: `status_${projectItem.id}`,
            align: 'end',
            width: '20px',
          })
          this.headers.push({
            title: `Prefix (${projectItem.name})`,
            sortable: true,
            key: `prefix_${projectItem.id}`,
            align: 'left',
            width: '20px',
          })
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