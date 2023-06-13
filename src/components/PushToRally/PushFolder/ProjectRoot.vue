<template lang="pug">
v-card.w-100(density="compact" ).ma-0.pa-0
  v-card-text(v-if="this.isLoading")
    v-progress-circular(v-show="this.isLoading" indeterminate
        color="primary")
  v-card-text.pt-0.mt-0.pa-1(v-else)
    //v-btn.my-4(@click="loadProjectStructure" align="left" text-align="left") refresh
    v-row(v-for="subFolder in folders" :key="subFolder.dir_name" :folder="subFolder")
      ProjectFolder.pt-3.float-left.my-0(:dir_name="subFolder.dir_name"
        :id="subFolder.dir_name"
        :folders="subFolder.folders"
        show="true")
        template(#refreshButton)
          v-btn(@click="loadProjectStructure"
            icon="fa-solid fa-arrows-rotate").float-right

</template>

<script>
import ProjectFolder from "@/components/PushToRally/PushFolder/ProjectFolder";
import {flask_url} from "@/scripts/config";
import axios from "axios";

export default {
  name: "ProjectRoot",
    components: {
    ProjectFolder
  },
  props: {
    project: {
      type: Object
    }
  },
  data() {
    return {
      name: "",
      folders: "",
      isLoading: false
    }
  },
  methods: {
    loadProjectStructure(){
      this.isLoading = true
      const url = `${flask_url}/project`
      axios.get(url, { params: { id: this.project.id, refresh: true}})
      .then((response) => {
        if (response.statusText === 'OK'){
          console.log("project loaded")
          this.folders = response.data
          console.log(this.folders)
          return response.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted() {
    this.loadProjectStructure()
  }
}
</script>

<style scoped>

</style>