<template lang="pug">
v-row.ma-1
  v-col.py-0(cols="12")
    h2 Import parameters
    v-text-field(label="default path" v-model="importPath" )
v-row.ma-1
  v-col.py-0(cols="12")
    GeneralConfigSilo
</template>

<script>
import GeneralConfigSilo from "@/components/PushToRally/Forms/GeneralConfigSilo";

export default {
  name: "ImportConfigDetails",
  components:{
    GeneralConfigSilo
  },
  data(){
    return {
    }
  },
  computed: {
    importPath: {
      get(){
        console.log(this.$store.getters['configuration/defaultImportPath'])
        return this.$store.getters['configuration/defaultImportPath']
      },
      set(value){
        this.$store.dispatch('configuration/updateDefaultImportPath', value)
      }
    }
  }
}
</script>

<style scoped>

</style>