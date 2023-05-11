<template lang="pug">
v-expansion-panels()
  v-expansion-panel()
    v-expansion-panel-title(expand-icon="fa-sharp fa-solid fa-pen-to-square"
      collapse-icon="fa-solid fa-check")
      v-row
        v-col(cols=2)
          v-icon(icon="fas fa-gears" class="pr-8")
        v-col(cols=5)
          | {{ selectedSilo}}
        v-col(cols=5)
          | {{ selectedProject}}
    v-expansion-panel-text
      v-card(density="compact"  :loading="isLoading")
      v-card-item(density="compact")
      v-card-text(density="compact" )
        v-row
          v-col(cols="6")
            v-row(v-show="availableSiloConfigs.length > 0")
              v-select(class="mx-2"
                v-model="selectedSilo"
                :items="availableSiloConfigs"
                name="selectedSilo"
                item-title="display_name"
                item-value="display_name"
                :rules="[v => !!v || 'Selection required']"
                label="Selected Rally Silo"
                density="compact"
                required)
              v-btn(class="mx-2"
                density="compact"
                @click.left=""
                icon="fas fa-plus")
            v-row(v-show="availableSiloConfigs.length == 0")
              v-btn(density="compact"
                  @click.left=""
                  append-icon="fas fa-plus") Add a new configuration
          v-divider(vertical="true")
          v-col(cols="6")
            v-row(v-show="availableProjects.length > 0")
              v-select(class="mx-2"
                v-model="selectedProject"
                :items="availableProjects"
                name="selectedProject"
                item-title="display_name"
                item-value="display_name"
                :rules="[v => !!v || 'Project required']"
                label="Selected Project"
                density="compact"
                required)
              v-btn(density="compact"
                @click.left=""
                icon="fas fa-plus")
            v-row(v-show="availableProjects.length == 0")
              v-btn(density="compact"
                @click.left=""
                append-icon="fas fa-plus") Add a new project

</template>

<script>
import '@/assets/main.css'

export default {
  name: "TheHeader",
  props: {
  },
  data() {
    return {
      expanded: false,
      configTitle: "test",
      isLoading: false,
      selectedSilo: null,
      availableSiloConfigs: [
        {
          display_name: "rallyDemo (demo org)"
        },
        {
          display_name: "Staging (demo org)"
        }
      ],
      selectedProject: null,
      availableProjects: [
        {
          display_name: "Git->rallydemo"
        },
        {
          display_name: "local: /test/project/"
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>