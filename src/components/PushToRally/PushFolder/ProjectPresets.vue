<template lang="pug">
v-container(class="mx-1" fluid)
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
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
  name: "ProjectPresets",
  components:{
    VDataTable
  },
  props: {

  },
  data() {
    return {
      itemsPerPage: 5,
      presetHeaders: [
        {
          title: 'name',
          align: 'start',
          sortable: false,
          key: 'name'
        },
        {
          title: 'Exists in silo ?',
          align: 'end',
          sortable: true,
          key: 'existsInSilo'
        },
        {
          title: 'Same as Silo ?',
          align: 'end',
          sortable: true,
          key: 'sameAsSilo'
        },
        {
          title: 'Status',
          align: 'end',
          sortable: true,
          key: 'status'
        }
      ],
      presetsList: [
        {
          name: "00_Autostart",
          existsInSilo: true,
          sameAsSilo: null,
          status: "identical"
        }
      ]
    }
  },
  methods: {
    presetInSiloClass(item){
      console.log(`status`)
      return item.existsInSilo ? "in-silo" : "not-in-silo"
    }
  }
}
</script>

<style scoped>
.not-in-silo {
  background-color: grey;
}

.in-silo {
  background-color: lightgreen;
}
</style>