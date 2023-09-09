import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import { routes } from './router';
import {store} from "@/store/store";

// vuediff
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';
// extend python language
import python from 'highlight.js/lib/languages/python';

VueDiff.hljs.registerLanguage('python', python);

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


router.beforeEach(function(to, from, next){
    console.log(`Login on page:`)
    console.log(from)
    console.log(to)
    console.log(`is logged in ?`)
    console.log(store.getters['auth/isLoggedIn'])
    if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']){
      next('/login');
    }
    else if (to.path === '/login' && store.getters['auth/isLoggedIn']){
      next('/export')
    }
    else {
      next()
    }

  }
);


export const Vue = createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(VueCookies)
  .use(VueDiff, {
    componentName: 'Diff',
  })
  .mount('#app')


