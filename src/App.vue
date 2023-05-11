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
      TheHeader(:selected-silo="siloConfig" )

      //v-list
      //  v-list-item(title="Add configuration" ) test
      //v-divider
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
    TheHeader,
    TestModule
  },
  data() {
    return {
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
