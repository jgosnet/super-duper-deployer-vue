<template lang="pug">
v-expansion-panel
  v-expansion-panel-title
    div
      v-icon(icon="fa-solid fa-angle-right" class="pr-3")
      | {{ folder }}

  v-expansion-panel-text
    PusherFolderItem(v-for="subFolder in folder.folders" :key="subFolder.name" :folder="subFolder")
    //PushFolders(:folders="folder.folders")
    | {{folder.folders }}
</template>

<script>
import PushFolders from "@/components/PushToRally/PushFolder/PushFolders";

export default {
  name: "PusherFolderItem",
  components: {
    PushFolders
  },
  props: {
    folder: Object,
  }
}
</script>

<style scoped>
.v-expansion-panel-text>>> .v-expansion-panel-text__wrapper {
  padding: 0 !important;
  padding-left: 15px !important;
}
</style>