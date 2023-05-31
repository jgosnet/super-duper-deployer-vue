<template lang="pug">
v-container
  v-data-table(
    v-model:items-per-page="itemsPerPage"
    :headers="presetHeaders"
    :items="presetsList"
    item-value="name"
    class="elevation-1"
    density="compact"
  )

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
      desserts: [
          {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
      itemsPerPage: 5,
      presetHeaders: [
        {
          title: 'name',
          value: 'name',
          align: 'start',
          sortable: true,
          key: 'name'
        },
        {
          title: 'Exists in silo ?',
          value: 'existsInSilo',
          align: 'end',
          sortable: true,
          key: 'existsInSilo'
        },
        {
          title: 'Status',
          value: 'Status',
          align: 'end',
          sortable: true,
          key: 'status'
        }
      ],
      presetsList: [
        {
          name: "00_Autostart",
          existsInSilo: false,
          status: "identical"
        }
      ]
    }
  }
}
</script>

<style scoped>
td {
  text-align: left;
}
</style>