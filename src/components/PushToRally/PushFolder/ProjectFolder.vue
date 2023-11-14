<template lang="pug">
v-card.my-0.py-0(class="w-100 mb-0"
  density="default"
  height="50%"
  elevation="0")
  v-card-actions(@click="toggle_folder").py-0.hoverClass
    //| {{this.folder_path}}

    v-btn(class="text-right"
        size="small"
        :icon="(this.localShow) ? 'fas fa-minus' : 'fas fa-plus'")
    v-divider(vertical)
    span.pl-3.text-uppercase {{ this.dir_name }}
    i.pl-3(v-show="(localFolders.length === 0 && this.computedPresets.length === 0)" ) (empty)
    v-spacer
    slot(name="refreshButton")
    v-btn(size="small" icon="fa-solid fa-rotate"
      @click.stop="refreshFolder").float-right


  v-expand-transition
    div(v-show="localShow && (localFolders.length > 0 || this.computedPresets.length > 0)")
      div(v-if="this.computedPresets && this.computedPresets.length > 0")
        v-divider
        v-row.w-100
          ProjectPresets(:presetsList="this.computedPresets").w-100

      div(v-if="this.computedRules && this.computedRules.length > 0")
        v-divider
        v-row.w-100
          ProjectRules(:rulesList="this.computedRules").w-100
      v-divider
      v-card-text(height="50%")
        v-row(v-for="subFolder in localFolders" :key="dir_name + subFolder.name" :folder="subFolder")
          ProjectFolder.ml-10(:dir_name="subFolder.dir_name"
            :projectId="this.projectId"
            :folders="subFolder.folders"
            :files="subFolder.files"
            :id="folder_path + '/' + subFolder.dir_name + 'project'"
            :folder_path="subFolder.dir_name + '/'"
            show=false
            :show-all="this.showAll")


</template>

<script>
import ProjectPresets from "@/components/PushToRally/PushFolder/ProjectPresets";
import {mapGetters} from "vuex";
import {api} from "@/scripts/axios_config";
import ProjectRules from "@/components/PushToRally/PushFolder/ProjectRules";

export default {
  name: "ProjectFolder",
  components: {ProjectRules, ProjectPresets},
  computed:{
    ...mapGetters('siloConfiguration', ['selectedSiloNames']),
    computedPresets(){
      console.log(`computed presets: ${this.files}`)
      if (this.files == undefined){
        return []
      }
      return this.files.filter(obj => obj['type'] === 'preset')
    },
    computedFiles(){
      console.log(`computed files: ${this.files}`)
      if (this.files == undefined){
        return []
      }
      return this.files.filter(obj => obj['type'] === 'file')
    },
    computedRules(){
      console.log(`computed rules: ${this.files}`)
      if (this.files == undefined){
        return []
      }
      return this.files.filter(obj => obj['type'] === 'rule')
    }
  },
  props: {
    show: Boolean,
    showAll: Boolean,
    folders: Array,
    files: Array,
    dir_name: String,
    id: String,
    folder_path: String,
    projectId: String,
  },
  data(){
    return {
      localShow: this.show,
      localFolders: this.folders,
    }
  },
  methods: {
    toggle_folder() {
      this.localShow = !this.localShow
    },
    refreshFolder(){
      const url = `project/${this.projectId}?prefix=${this.folder_path}`
      console.log(this.folders)
      api.get(url, { params: { refresh: true}})
          .then((response) => {
            if (response.statusText === 'OK'){
              console.log("project loaded")
              if (response.data.length > 0){
                console.log(response.data[0])
                console.log(response.data[0].folders)
                // eslint-disable-next-line vue/no-mutating-props
                this.localFolders = response.data[0].folders
                console.log(response)
                console.log(this.localFolders)
              } else{
                console.log(`Folder is empty`)
              }

              return response.data
            }
          })
          .catch((error) => {
            console.log(error);
            // eslint-disable-next-line vue/no-mutating-props
          })
      .finally(() => {
        // this.isLoading = false
      })
    },
  },
  watch: {
    showAll(newValue){
      if (newValue === true){
        this.localShow = true
      } else {
        this.localShow = false
      }
    }
  },
  mounted() {
    if (this.showAll === true){
      this.localShow = true
    }
  }
}
</script>

<style scoped>
.hoverClass:hover {
  background-color: lightgrey;
}

.v-card-actions{
  min-height: 30px !important;
}
</style>