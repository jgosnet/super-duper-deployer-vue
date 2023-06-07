<template lang="pug">
v-card
  v-layout
    v-app-bar(color="surface-variant" prominent)
      v-menu(transition="slide-y-transition")
        template(v-slot:activator="{ props }")
          v-btn(v-bind="props" icon="fas fa-bars")
        v-list(density="compact" nav)
          v-list-item(v-for='item in menuItems'
            :key='item.title'
            :to='item.path'
            :prepend-icon="item.icon"
            exact-active-class='grey' large
            @click="setSelectedComponent(item.component)")
            v-list-item-title.item-title {{item.title}}

      v-toolbar-title Super Duper Deploy Tool

    v-main(class="pt-1")
      keep-alive
        router-view(v-slot="{ Component }")
          transition(name="fade" mode="out-in" )
            Component(:is="Component")

</template>

<script>
/* eslint-disable */
import './assets/main.css'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      selectedComponent: "PusherHome",
      selectedProject: {
        name: "test"
      },
      siloConfig: {},
      drawer: true,
      rail: true,
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
    setSelectedComponent(value) {
      this.selectedComponent = value
    }
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
