<template lang="pug">
v-row.ma-1
  v-col.py-0(cols="6")
    GeneralConfigSilo
  v-divider(vertical)
  v-col.py-0(cols="6")
    GeneralConfigProject



</template>

<script>
import GeneralConfigProject from "@/components/PushToRally/Forms/GeneralConfigProject";
import GeneralConfigSilo from "@/components/PushToRally/Forms/GeneralConfigSilo";

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