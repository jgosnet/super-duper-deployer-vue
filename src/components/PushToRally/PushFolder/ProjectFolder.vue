<template lang="pug">
v-card.my-0.py-0(class="w-100 mb-0"
  density="compact"
  height="50%"
  elevation="0")
  v-card-actions.py-0
    v-btn(class="text-right"
      :icon="this.localShow ? 'fas fa-minus' : 'fas fa-plus'"
      @click="toggle_folder")
    v-divider(vertical)
    span(@click="toggle_folder" big).pl-3.text-uppercase {{ this.dir_name }}
    v-spacer
    slot(name="refreshButton")


  v-expand-transition
    div(v-show="localShow")
      v-divider
      v-row(v-if="dir_name == 'presets'").w-100
        ProjectPresets.w-100
      v-divider
      v-card-text
        v-row(v-for="subFolder in folders" :key="dir_name + subFolder.name" :folder="subFolder")
          ProjectFolder(:dir_name="subFolder.dir_name"
            :folders="subFolder.folders"
            :id="folder_path + '/' + subFolder.dir_name + 'project'"
            :folder_path="folder_path + '/' + subFolder.dir_name"
            class="ml-10")


</template>

<script>
import ProjectPresets from "@/components/PushToRally/PushFolder/ProjectPresets";

export default {
  name: "ProjectFolder",
  components: {ProjectPresets},
  props: {
    show: Boolean,
    folders: Array,
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
  }
}
</script>

<style scoped>
</style>