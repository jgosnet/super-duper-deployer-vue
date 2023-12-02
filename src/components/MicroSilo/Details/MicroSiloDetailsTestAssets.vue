<template lang="pug">
v-timeline-item(icon="fa-solid fa-indent"
  :dot-color="loadingIconColor"
  size="large"
  fill-dot
  @click="").pointer
  template(v-slot:icon)
    div(v-if="isLoading" )
      v-progress-circular(
        indeterminate
          color="primary"
          model-value="20")
    div(v-else)
      v-icon fa-solid fa-indent
  v-card(elevation="3" )
    v-card-title
      b  Test assets
    v-card-text
       p Click for more details

</template>

<script>
export default {
  name: "MicroSiloDetailsTestAssets",
  props:{
    silo: Object
  },
  data(){
    return {
      isLoading: true,
    }
  },
  computed: {
    loadingIconColor(){
      if (this.isLoading){
        return "blue"
      }
      return "red"
    },
    loadingIcon(){
      if (this.isLoading){
        return "blue"
      }
      return "red"
    }
  }
}
</script>

<style scoped>

</style>