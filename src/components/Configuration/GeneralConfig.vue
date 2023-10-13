<template lang="pug">
v-row
  v-col.py-1.px-3(cols="6")
    GeneralConfigSilo
  //v-divider(vertical)
  v-col.py-1.px-3(cols="6")
    GeneralConfigProject



</template>

<script>
import GeneralConfigProject from "@/components/Configuration/Project/GeneralConfigProject";
import GeneralConfigSilo from "@/components/Configuration/Silo/GeneralConfigSilo";

export default {
  name: "GeneralConfig",
  components: {
    GeneralConfigSilo,
    GeneralConfigProject,
  },
  props: {
  },
  data(){
    return {

    }
  },
  provide(){
    return {
      localSelectedProjects: []
    }
  },
  computed: {
  },
  methods:{
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>