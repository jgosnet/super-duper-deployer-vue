<template lang="pug">
v-row.my-3.mx-2
  h2 Projects
    NewProjectForm
  v-spacer
  v-btn.ml-3(icon="fa-solid fa-arrows-rotate" size="small" @click="loadProjectsList")
ConfirmDialog(ref="confirmDialogue")
v-row
  v-col(cols="12")
    div(v-if="isLoading" )
      v-progress-circular(v-show="isLoading" indeterminate
        color="primary"
        model-value="20")
      span.pl-2 Loading..
    div(v-else-if="errorMessage")
      v-icon(color="red") fa-solid fa-triangle-exclamation
      | {{errorMessage}}
    div(v-else)
      draggable(v-model="projectList"
        item-key="id"
        group="project"
        handle=".handle"
        animation="150"
        ghost-class="sortable-ghost"
        fallback-class="fallbackStyleClass"
        :force-fallback="true")
        template(#item="{element}")
          v-card(elevation="3").my-2
            v-card-title
              v-icon.handle.mr-3(
                size="x-small"
                ) fa-solid fa-bars
              | {{element.name}}
              v-icon.ml-5(size="x-small" icon="far fa-trash-alt" @click="deleteProject(element)")

              input(type="checkbox" v-model="element.isSelected").float-right

            v-card-text
              | {{element}}
              v-row.pt-2.px-5
                span.font-weight-bold ID:
                span.font-weight-medium.pl-2 {{element.id}}
              v-row.pt-2.px-5
                span.font-weight-bold Type:
                span.font-weight-medium.pl-2 {{element.type}}

              v-row.pt-2.px-5(v-if="element.type==='local'" )
                span.font-weight-bold Path:
                span.font-weight-medium.pl-2 {{element.path}}
              div(v-if="element.type==='github'")
                v-row.pt-2.px-5
                  span.font-weight-bold Repo:
                  span.font-weight-medium.pl-2 {{element.repo}}
                v-row.pt-2.px-5
                  span.font-weight-bold Branch:
                  span.font-weight-medium.pl-2 {{element.branch}}




</template>

<script>
import draggable from "vuedraggable";
import {mapGetters} from "vuex";
import ConfirmDialog from "@/components/utils/ConfirmDialog";
import NewProjectForm from "@/components/Configuration/Project/NewProjectForm";

export default {
  name: "GeneralConfigProject",
  components: {
    NewProjectForm,
    ConfirmDialog,
    draggable
  },
  data(){
    return {
      localSelectedProjects: this.selectedProjectNames,
    }
  },
  computed: {
    ...mapGetters('projectConfiguration', ['selectedProjectNames', 'isLoading', 'errorMessage']),
    projectList: {
      get(){
        console.log(this.$store.getters['projectConfiguration/projectsList'])
        return this.$store.getters['projectConfiguration/projectsList']
      },
      set(value){
        this.$store.dispatch('projectConfiguration/updateProjectsList', value)
      }
    },
  },
  methods:{
    loadProjectsList() {
      this.$store.dispatch('projectConfiguration/loadProjectsList');
    },
    async deleteProject(project) {
      const ok = await this.$refs.confirmDialogue.show({
          title: 'Delete Page',
          message: `Are you sure you want to delete this project ? [${project.name}
          (id: ${project.id})]`,
      })
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        console.log('Trying to delete this project')
        this.$store.dispatch('projectConfiguration/deleteProject', project.id);
      } else {
        console.log('You chose not to delete this page. Doing nothing now.')
      }
    },
  },
  watch:{
  },
  mounted() {
  }
}
</script>

<style scoped>
.sortable-ghost {
  opacity: 20%;
  border: 1px dashed grey;
  font-size: 0;
  overflow: hidden;
}

.fallbackStyleClass{
  opacity: 70%;
}
</style>