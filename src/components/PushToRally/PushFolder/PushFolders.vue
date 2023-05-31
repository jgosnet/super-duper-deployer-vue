<template lang="pug">
v-expansion-panels(multiple)
  //| folders are: {{folders }}
  p(v-for="subFolder in folders" :key="subFolder.name" :folder="subFolder")
    | {{subFolder}}
    v-divider
  PusherFolderItem(v-for="subFolder in folders" :key="subFolder.name" :folder="subFolder")
</template>

<script>
import PusherFolderItem from "@/components/PushToRally/PushFolder/PusherFolderItem";

export default {
  name: "PushFolders",
  components: {
    PusherFolderItem
  },
  props: {
    folders: Array
  }
}
</script>

<style scoped>

</style>