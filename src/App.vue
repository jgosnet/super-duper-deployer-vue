<template lang="pug">
v-card
  v-layout
    v-app-bar(color="surface-variant" prominent)
      //v-app-bar-nav-icon(icon="fas fa-bars" @click.stop="drawer = !drawer")
      v-toolbar-title Super Duper Deploy Tool

    //v-navigation-drawer(rail
    //expand-on-hover
    //@click="rail = !rail"
    //  v-model="drawer"
    //  width="30px")
    //  v-list(density="compact" nav)
    //    v-list-item(v-for='item in menuItems'
    //      :key='item.title'
    //      :to='item.path'
    //      :prepend-icon="item.icon"
    //      exact-active-class='grey' large)
    //      v-list-item-title.item-title {{item.title}}

    v-main(class="pt-1")
      //PusherHome
      TheHeader(:selected-silo="siloConfig" :selected-project="selectedProject")
      PusherHome(:selected-project="selectedProject")

      //v-list
      //  v-list-item(title="Add configuration" ) test

</template>

<script>
/* eslint-disable */
import './assets/main.css'
import TheHeader from "@/components/Layout/TheHeader";
import PusherHome from "@/components/PushToRally/PusherHome";
import TestModule from "@/components/TestsModules/TestModule";

export default {
  name: 'App',
  components: {
    PusherHome,
    TheHeader,
    TestModule
  },
  data() {
    return {
      itemsPerPage: 5,
      headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', align: 'end', key: 'calories' },
          { title: 'Fat (g)', align: 'end', key: 'fat' },
          { title: 'Carbs (g)', align: 'end', key: 'carbs' },
          { title: 'Protein (g)', align: 'end', key: 'protein' },
          { title: 'Iron (%)', align: 'end', key: 'iron' },
        ],
      desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22',
          },
        ],

      selectedProject: {
        name: "test"
      },
      siloConfig: {},
      drawer: true,
      rail: true,
      menuItems: [
        {title: 'Configuration', path: '/config', icon: 'fas fa-cogs'},
        {title: 'Push from project', path: '/workflows', icon: 'fas fa-cloud-upload-alt'},
        {title: 'Import From Rally', path: '/rallyImport', icon: 'fas fa-download'},
        {title: 'Compare Silos', path: '/compare', icon: 'fas fa-not-equal'}
      ],
      available_configs: [],
      selected_config: {}
    }
  },
  computed: {

  }
}
</script>

<style>


#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.default_height {
  padding-top: 0px;
  min-height: 300px;
}

.v-navigation-drawer .v-list .v-list-item .v-list-item-title{
  font-size: small;
  font-weight: bold;
}

</style>
