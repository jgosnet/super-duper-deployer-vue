<template lang="pug">
v-row.my-3.mx-2
  h2 Projects
    v-btn.ml-3(icon="fas fa-plus")
  v-spacer
  v-btn.ml-3(icon="fa-solid fa-arrows-rotate" size="small" @click="loadProjectsList")

v-row
  v-col(cols="12")
    div(v-if="this.isLoading" )
      v-progress-circular(v-show="this.isLoading" indeterminate
        color="primary")
    div(v-else-if="errorMessage")
      v-icon(color="red") fa-solid fa-triangle-exclamation
      | {{errorMessage}}
    div(v-else)
      draggable(v-model="projectList"
        item-key="id"
        group="project")
        template(#item="{element}")
          v-card
            v-card-title
              v-icon.mr-3(size="x-small" ) fa-solid fa-bars
              | {{element.name}} ({{element.id}})
              input(type="checkbox" v-model="element.isSelected").float-right
              //v-checkbox(v-model="element.isSelected" label="" )

            v-card-text
              v-row
                | {{element.type}}
                br
                | {{element.path}}


</template>

<script>
import draggable from "vuedraggable";
import {mapGetters} from "vuex";

export default {
  name: "GeneralConfigProject",
  components: {
    draggable
  },
  data(){
    return {
      isLoading: false,
      localSelectedProjects: this.selectedProjectNames,
    }
  },
  computed: {
    ...mapGetters('configuration', ['selectedProjectNames', 'errorMessage']),
    projectList: {
      get(){
        console.log(this.$store.getters['configuration/projectsList'])
        return this.$store.getters['configuration/projectsList']
      },
      set(value){
        this.$store.dispatch('configuration/updateProjectsList', value)
      }
    }
  },
  methods:{
    loadProjectsList() {
      this.$store.dispatch('configuration/loadProjectsList');
    }
  },
  watch:{
    projectsList(newValue){
      console.log('found new value for projects list')
      console.log(newValue)
      this.localSelectedProjects = newValue
      console.log(this.localSelectedProjects)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>