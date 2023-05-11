import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// import { fas } from '@fortawesome/fontawesome-free-solid';
// import { fab } from '@fortawesome/fontawesome-free-brands';
// import { far } from '@fortawesome/fontawesome-free-regular';
// import * as fontawesome from "@fortawesome/fontawesome-svg-core";
//
// fontawesome.library.add(fas, fab, far)

createApp(App)
  .use(vuetify)
  .mount('#app')
