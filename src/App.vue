<template lang="pug">
v-card(color="transparent" elevation="0" )
  //PresetDiffView
  SnackBarPopup
  v-layout
    v-app-bar(color="surface-variant" prominent density="compact" )
      v-menu(transition="slide-y-transition" v-if="isLoggedIn")
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
      v-btn.mr-2(link to="login" v-show="!isLoggedIn" ) login
      v-btn.mr-2(@click="logout" v-show="isLoggedIn" ) log out


    v-main.pt-1
      router-view(v-slot="{ Component }")
        transition(name="fade" mode="out-in" )
          keep-alive
            Component(:is="Component")

</template>

<script>
/* eslint-disable */
import './assets/main.css'
import SnackBarPopup from "@/components/utils/SnackBarPopup";
import PresetDiffView from "@/components/Compare/PresetDiffView";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    PresetDiffView,
    SnackBarPopup
  },
  data() {
    return {
      menuItems: [
        {title: 'Home', path: '/', icon: 'fas fa-home'},
        {title: 'Push from project', path: '/export', icon: 'fas fa-cloud-upload-alt'},
        {title: 'Import From Rally', path: '/silo', icon: 'fas fa-download'},
        {title: 'Compare Silos', path: '/compare', icon: 'fas fa-not-equal'}
      ]
    }
  },
    computed: {
      ...mapGetters('auth', ['isLoggedIn'])
    },
  methods: {
    openSnackbar(){
      this.snackbar = true
    },
    async logout(){
      console.log(`Logging out`)
      await this.$store.dispatch('auth/logout')
      this.$router.replace('/login')
    }
  },
  mounted() {
    console.log('loading!')
    // this.$store.dispatch('configuration/loadConfiguration');
  }
}
</script>

<style>

body{
        background-image: url('/src/assets/background-2462431_1920.jpg') !important;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}
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

input[type=checkbox]{
     margin: 4px 0 0;
    line-height: normal;
    width: 20px;
    height: 20px;
}

</style>
