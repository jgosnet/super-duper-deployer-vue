<template lang="pug">
v-card(class="w-100 mb-2"
  density="compact"
  height="50%"
  elevation="3" )
  v-card-actions
    v-btn(class="text-right"
      :icon="show ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'"
      @click="show = !show")
    v-divider(vertical)
    v-btn {{ name }}

  v-expand-transition
    div(v-show="show")
      v-divider
      v-row(v-if="name == 'presets'")
        ProjectPresets
      v-divider
      v-card-text
        v-row(v-for="subFolder in folders" :key="subFolder.name" :folder="subFolder")
          ProjectFolder(:name="subFolder.name"
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
    name: String,
    id: String
  }
}
</script>

<style scoped>
</style>