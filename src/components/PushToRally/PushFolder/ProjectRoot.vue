<template lang="pug">
v-card(class="w-100" density="compact" )
  v-card-title(text-align="left" align="left") {{ name }}
  div()
    v-card-text
      v-row(v-for="subFolder in folders" :key="subFolder.name" :folder="subFolder")
        ProjectFolder(:dir_name="subFolder.name"
          :id="subFolder.id"
          :folders="subFolder.folders")
</template>

<script>
import ProjectFolder from "@/components/PushToRally/PushFolder/ProjectFolder";

export default {
  name: "ProjectRoot",
    components: {
    ProjectFolder
  },
  props: {
    name: String,
    folders: Array
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>

</style>