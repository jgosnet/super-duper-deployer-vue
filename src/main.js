import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import { routes } from './router';

// cookies
import VueCookies from 'vue-cookies'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  components,
  directives,
})


const router = createRouter({
  history: createWebHistory(),
  routes
});

import {store} from "@/store/store";

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(VueCookies)
  .mount('#app')


