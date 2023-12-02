<template lang="pug">
v-card.w-100(density="compact" ).ma-0.pa-0
  v-card-text(v-if="this.isLoading")
    v-progress-circular(v-show="this.isLoading" indeterminate
        color="primary")
  v-card-text.pt-0.mt-0.pa-1(v-else)
    //v-btn.my-4(@click="loadProjectStructure" align="left" text-align="left") refresh
    v-row.mt-4.mx-4(v-if="this.folders.length > 0")
      v-btn(@click="expandAll" v-if="this.showAll === false") Expand All
      v-btn(@click="collapseAll" v-if="this.showAll === true") Collapse All
      v-combobox.pl-3.pr-3.combobox-spec(v-model="preSelectedSilos"
        :items="this.selectedSiloNames"
          label="Push to silo:"
          multiple
          clearable
          chips)
      //| --{{test}}--
    v-row.my-4.mx-4(v-else)
      v-btn(@click="refresh" v-show="!this.isLoading" ) Refresh Project
    v-row.my-0.mx-4
      v-checkbox.pl-3(label="Show generic files (that are not preset/rules)"
            v-model="showFiles" density="compact" hide-details)
    v-row(v-for="subFolder in folders" :key="subFolder.dir_name" :folder="subFolder")
      ProjectFolder.pt-3.float-left.my-0(@update-files="updateFiles"
        :show-files="showFiles"
        :dir_name="subFolder.dir_name"
        :projectId="this.project.id"
        :id="subFolder.dir_name  + 'project'"
        :folders="subFolder.folders"
        :files="subFolder.files"
        folder_path=""
        show=true,
        :showAll="this.showAll")
        //template(#refreshButton)
        //  v-btn(@click="loadProjectStructure"
        //    icon="fa-solid fa-arrows-rotate").float-right

</template>

<script>
import ProjectFolder from "@/components/PushToRally/PushFolder/ProjectFolder";
import {api} from "@/scripts/axios_config";
import {mapGetters} from "vuex";

export default {
  name: "ProjectRoot",
    components: {
    ProjectFolder
  },
  props: {
    project: {
      type: Object
    }
  },
  data() {
    return {
      showFiles: false,
      name: "",
      folders: [],
      isLoading: false,
      showAll: false,
      test: [],
    }
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSiloNames']),
    preSelectedSilos: {
      get(){
        console.log(this.$store.getters['siloConfiguration/preSelectedSilos'])
        return this.$store.getters['siloConfiguration/preSelectedSilos']
      },
      set(value){
        console.log("attempting to update preselection")
        console.log(value)
        this.$store.dispatch('siloConfiguration/updatePreSelectedSilos', value)
      }
    }
  },
  methods: {
    updateFiles(value){
      console.log(`Root, no update needed!`);
      this.folders[0].files = value.files;
    },
    refresh(){
      this.loadProjectStructure()
    },
    expandAll(){
      this.showAll = true
    },
    collapseAll(){
      this.showAll = false
    },
    loadProjectStructure(){
      this.isLoading = true
      const url = `project/${this.project.id}`
      api.get(url, { params: { refresh: true}})
      .then((response) => {
        if (response.statusText === 'OK'){
          console.log("project loaded")
          this.folders = response.data
          console.log(this.folders)
          return response.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted() {
    this.loadProjectStructure()
  }
}
</script>

<style scoped>
.combobox-spec{
  min-width: 300px;
  max-width: 500px;
}

.v-card-actions{
  min-height: 30px !important;
}
</style>