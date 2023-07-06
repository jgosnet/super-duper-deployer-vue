<template lang="pug">
v-card.w-100
  v-row.mt-2.ml-2.mr-2
    v-btn.ma-2(size="small"
      @click='loadPresets()'
      prepend-icon="fas fa-sync-alt") refresh
    v-btn.ma-2(size="small"
      @click='loadPresets()'
      prepend-icon="fas fa-sync-alt") refresh
    v-spacer
    v-text-field.mr-2(
          v-model='search'
          label='Search'
          outlined
          append-icon='fas fa-search'
          min-width="200px"
        )
  v-row(v-if="this.isLoading")
    v-progress-circular(v-show="this.isLoading" indeterminate
        color="primary")
  v-row
    v-data-table(
    v-model:items-per-page="itemsPerPage"
      :headers="presetHeaders"
      :items="presetsList"
      item-value="name"
      class="elevation-1"
      density="compact"
      :item-class="presetInSiloClass"
      color="grey-lighten-4"
    )
      template(v-slot:item.existsInSilo="{ item }")
        v-icon {{ item.existsInSilo ? "fa-solid fa-check" : "fa-solid fa-xmark" }}

      template(v-slot:item.name="{ item }")
        v-icon(color="blue" class="pr-4") fa-solid fa-circle-info
        | {{item.value }}
</template>

<script>
import {flask_url} from "@/scripts/config";
import axios from "axios";

export default {
  name: "RallyImportPresets",
  inject: ['selectedSilo'],
  data(){
    return {
      isLoading: false,
      search: '',
      presetList: [],
      headers: [
        {
          text: 'Provider Type',
          align: 'left',
          value: 'providerType'
        },
        {
          text: 'Preset Name',
          align: 'left',
          value: 'name',
        }
      ],
    }
  },
  computed: {
  },
  methods: {
    loadPresets(){
      this.isLoading = true;
      const url = `${flask_url}/silo/presets`
      this.isLoading = true
      axios.get(url)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
        })
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>