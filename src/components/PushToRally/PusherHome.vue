<template lang="pug">
v-card
  v-card-title
    v-row.py-3
      h2 Push from project
      v-spacer
      push-to-rally-configuration(:selectedProjects="selectedProjects")
  v-card-text
    //v-row
    //  v-btn(@click="openAll(this.folders)"
    //    prepend-icon="fas fa-plus") Expand All
    v-row(class="mt-5")
      div(v-if="this.localProjects.length === 0").py-6
        span(align="center") No projects selected.
      div(v-else)
        v-tabs(bg-color="blue-grey-darken-4")
          v-tab(v-for="project in this.localProjects"  )
            | {{project}}
          //ProjectRoot(v-for="project in this.localProjects"
          //  :key="project.name"
          //  :name="project.name" :folders="project.folders")
      //ProjectFolder(name="Root/" :folders="folders")
      //PushFolders(:folders="folders")

      //v-expansion-panels(multiple)
      //  //| folders are: {{folders }}
      //  p(v-for="subFolder in this.folders" :key="subFolder.name" :folder="subFolder")
      //    | {{subFolder}}
      //    v-divider
      //  PusherFolderItem(v-for="subFolder in this.folders" :key="subFolder.name" :folder="subFolder")
</template>

<script>
import PusherFolderItem from "@/components/PushToRally/PushFolder/PusherFolderItem";
import ProjectFolder from "@/components/PushToRally/PushFolder/ProjectFolder";
import ProjectRoot from "@/components/PushToRally/PushFolder/ProjectRoot";
import PushToRallyConfiguration from "@/components/PushToRally/PushToRallyConfiguration";

export default {
  name: "PusherHome",
  components: {
    PushToRallyConfiguration,
    ProjectRoot,
    ProjectFolder,
    PusherFolderItem,
  },
  data() {
    return {
      selectedProjects: [],
      folders: [],
      localProjects: ["test", "test2"]
    }
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
    this.folders = [
        {
          name: "test1",
          expand:[0,1],
          folders: [
            {
              name: "presets",
              expand:false,
              folders: [
                {
                  name: "sub-subfolder1",
                  expand:false,
                  folders: []
                },
                {
                  name: "sub-subfolder2",
                  expand:false,
                  folders: []
                }
              ]
            },
            {
              name: "subfolder2",
              expand:false,
              folders: []
            }
          ]
        },
        {
          name: "test2",
          expand:false,
          folders: []
        }
      ]
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