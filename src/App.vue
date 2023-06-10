<template lang="pug">
v-card
  MyCounter
  HttpRequestsComponent
  v-layout
    v-app-bar(color="surface-variant" prominent density="compact" )
      v-menu(transition="slide-y-transition")
        template(v-slot:activator="{ props }")
          v-btn(v-bind="props" icon="fas fa-bars")
        v-list(density="compact" nav)
          v-list-item(v-for='item in menuItems'
            :key='item.title'
            :to='item.path'
            :prepend-icon="item.icon"
            exact-active-class='grey' large)
            v-list-item-title.item-title {{item.title}}

      v-toolbar-title Super Duper Deploy Tool
      //v-spacer
      i.pr-4 Beta0.1 (6/6/2023)

    v-main.pt-1
      router-view(v-slot="{ Component }")
        transition(name="fade" mode="out-in" )
          keep-alive
            Component(:is="Component")

</template>

<script>
/* eslint-disable */
import './assets/main.css'
import HttpRequestsComponent from "@/components/TestsModules/HttpRequestsComponent";
import MyCounter from "@/components/TestsModules/MyCounter";

export default {
  name: 'App',
  components: {
    MyCounter,
    HttpRequestsComponent
  },
  data() {
    return {
      menuItems: [
        {title: 'Home', path: '/', icon: 'fas fa-home'},
        {title: 'Push from project', path: '/export', icon: 'fas fa-cloud-upload-alt'},
        {title: 'Import From Rally', path: '/import', icon: 'fas fa-download'},
        {title: 'Compare Silos', path: '/compare', icon: 'fas fa-not-equal'}
      ]
    }
  },
  computed: {
  },
  methods: {

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
  margin-top: 45px;
}

.default_height {
  padding-top: 0px;
  min-height: 300px;
}

.fade-enter-active {
  transition: all 0.2s ease-out;
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>
