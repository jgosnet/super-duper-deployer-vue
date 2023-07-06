<template lang="pug">
v-card.my-0.py-0(class="w-100 mb-0"
  density="default"
  height="50%"
  elevation="0")
  v-card-actions.py-0
    v-btn(class="text-right"
      size="small"
      :icon="this.localShow ? 'fas fa-minus' : 'fas fa-plus'"
      @click="toggle_folder")
    v-divider(vertical)
    span(@click="toggle_folder").pl-3.text-uppercase {{ this.dir_name }}
    v-spacer
    slot(name="refreshButton")


  v-expand-transition
    div(v-show="localShow")
      v-divider
      v-row(v-if="this.computedPresets && this.computedPresets.length > 0").w-100
        ProjectPresets(:presetsList="this.computedPresets").w-100
      v-divider
      v-card-text(height="50%")
        v-row(v-for="subFolder in folders" :key="dir_name + subFolder.name" :folder="subFolder")
          ProjectFolder.ml-10(:dir_name="subFolder.dir_name"
            :folders="subFolder.folders"
            :files="subFolder.files"
            :id="folder_path + '/' + subFolder.dir_name + 'project'"
            :folder_path="folder_path + '/' + subFolder.dir_name"
            show=false
            :show-all="this.showAll")


</template>

<script>
import ProjectPresets from "@/components/PushToRally/PushFolder/ProjectPresets";
import {mapGetters} from "vuex";

export default {
  name: "ProjectFolder",
  components: {ProjectPresets},
  computed:{
    ...mapGetters('configuration', ['selectedSiloNames']),
    computedPresets(){
      console.log(`computed presets: ${this.files}`)
      if (this.files == undefined){
        return []
      }
      return this.files.filter(obj => obj['type'] === 'preset')
    }
  },
  props: {
    show: Boolean,
    showAll: Boolean,
    folders: Array,
    files: Array,
    dir_name: String,
    id: String,
    folder_path: String
  },
  data(){
    return {
      localShow: this.show
    }
  },
  methods: {
    toggle_folder() {
      this.localShow = !this.localShow
    }
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
.v-card-actions{
  min-height: 30px !important;
}
</style>