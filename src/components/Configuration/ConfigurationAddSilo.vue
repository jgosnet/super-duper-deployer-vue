<template lang="pug">
v-row
  v-dialog(v-model="dialog" persistent fullscreen transition="dialog-top-transition")
</template>

<script>
export default {
  name: "ConfigurationAddSilo",
  props: {
    dialog: Boolean
  }
}
</script>

<style scoped>

</style>