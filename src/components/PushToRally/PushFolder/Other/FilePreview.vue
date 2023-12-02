<template lang="pug">
div.w-100
  v-icon(@click="dialog = true" color="blue" ) fa-regular fa-eye
  span.pl-2 {{item.name}}
  v-dialog(v-model="dialog")
    template(v-slot:activator="{ props }")
    v-card(min-width="800px" )
      v-card-title
        b.pl-2 {{item.name}}
      v-card-text.w-100
        div(v-if="this.isLoading" )
          | loading
        div(v-else="")
          | loaded
</template>

<script>
export default {
  name: "FilePreview",
  props:{
    item: Object,
  },
  data() {
    return {
      dialog: false,
      lastRefresh: null,
      isLoading: true
    }
  }
}
</script>

<style scoped>

</style>