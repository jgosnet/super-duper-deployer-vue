<template lang="pug">
v-timeline-item(icon="fa-solid fa-list-check"
  dot-color="#B0C8D8"
  size="x-large"
  fill-dot
  @click="").pointer
  v-card(elevation="3" )
    v-card-title
      b  Rally Storage Locations
    v-card-text
      p The following RSLs will be deployed:
      ul.pl-5
        li ingest
        li inprocess
        li export
        li artifacts
        li packages
</template>

<script>
export default {
  name: "MicroSiloDetailsRsl",
  props:{
    silo: Object
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>
ul li{
  list-style-type: none
}
</style>