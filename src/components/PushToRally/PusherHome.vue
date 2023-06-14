<template lang="pug">
v-card(color="transparent")
  v-card-title
    v-row.py-3
      v-icon.ml-4(icon="fas fa-cloud-upload-alt")
      h2.ml-4 Push from project

      v-spacer
      push-to-rally-configuration
  v-card-text.w-100
    //v-row
    //  v-btn(@click="openAll(this.folders)"
    //    prepend-icon="fas fa-plus") Expand All

    div(v-if="selectedProjects.length === 0").py-6
      span(align="center") No projects selected.
    div(v-else)
      v-card.w-100
        v-tabs(v-model="tab" bg-color="blue-grey-darken-4")
          v-tab(v-for="project in selectedProjects" :value="project.id")
            | {{ project.name}}
      v-card-text(fluid).ma-0.pa-0
        v-window(v-model="tab" fluid)
          v-window-item(v-for="project in selectedProjects"
            :key="project.id"
            :value="project.id")
            keep-alive
              ProjectRoot(:project="project")

</template>

<script>
import ProjectFolder from "@/components/PushToRally/PushFolder/ProjectFolder";
import ProjectRoot from "@/components/PushToRally/PushFolder/ProjectRoot";
import PushToRallyConfiguration from "@/components/PushToRally/PushToRallyConfiguration";
import {mapGetters} from "vuex";

export default {
  name: "PusherHome",
  components: {
    PushToRallyConfiguration,
    ProjectRoot,
    ProjectFolder,
  },
  data() {
    return {
      tab: null,
      folders: [],
      localProjects: ["test", "test2"]
    }
  },
  computed:{
    ...mapGetters('configuration', ['selectedProjects']),
  },
  methods: {
    openAll(current_folders){
      console.log(`${JSON.stringify(current_folders)}`)
      for (const current_folder of current_folders){
        console.log(`parsing: ${JSON.stringify(current_folder)}`)
        current_folder.expand = [current_folder.name]
      }
    }
  },
  mounted() {
    console.log("hello")
  }
}
</script>

<style scoped>
.v-card{
  /*border: 2px solid*/
}

.float-right{
  text-align: right;
}

.shifted{

}
</style>