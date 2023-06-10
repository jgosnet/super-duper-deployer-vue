<template lang="pug">
v-form.mt-0(validate-on="submit lazy"
                  @submit.prevent="submit")
  v-row.ma-1
    v-col.py-0(cols="6")
      v-row.my-3.mx-2
        h2 Silo
          v-btn.ml-3(icon="fas fa-plus")
    v-divider(vertical)
    v-col.py-0(cols="6")
      v-row.my-3.mx-2
        h2 Projects
          v-btn.ml-3(icon="fas fa-plus")
      v-row
        v-col(cols="6")
          | Unselected projects
          draggable(v-model="projectsList"
            item-key="id"
            group="project")
            template(#item="{element}")
              v-card
                v-card-title
                  v-icon.mr-3(size="x-small" ) fa-solid fa-bars
                  | {{element.name}} ({{element.id}})
                v-card-text
                  v-row
                    | {{element.type}}
                    br
                    | {{element.path}}
        v-col(cols="6")
          | Selected projects
          draggable(v-model="selectedProjects"
            item-key="id"
            group="project")
            template(#item="{element}")
              v-card
                v-card-title {{element.name}} ({{element.id}})
                v-card-text
                  v-row
                    | {{element.type}}
                    br
                    | {{element.path}}
</template>

<script>
export default {
  name: "NewProjectForm"
}
</script>

<style scoped>

</style>