<template lang="pug">
v-card(class="w-100 mb-2"
  density="compact"
  height="50%"
  elevation="3")
  v-card-actions
    v-btn(class="text-right"
      :icon="this.localShow ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'"
      @click="toggle_folder")
    v-divider(vertical)
    v-btn(@click="toggle_folder") {{ dir_name }}

  v-expand-transition
    div(v-show="localShow")
      v-divider
      v-row(v-if="dir_name == 'presets'")
        ProjectPresets
      v-divider
      v-card-text
        v-row(v-for="subFolder in folders" :key="subFolder.name" :folder="subFolder")
          ProjectFolder(:dir_name="subFolder.name"
            :folders="subFolder.folders"
            :id="subFolder.id"
            class="ml-10")


</template>

<script>
import ProjectPresets from "@/components/PushToRally/PushFolder/ProjectPresets";

export default {
  name: "ProjectFolder",
  components: {ProjectPresets},
  props: {
    show: Boolean,
    folders: Object,
    dir_name: String,
    id: String
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