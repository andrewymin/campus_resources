import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "./css/app.css"

const vuetify = createVuetify({
    icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          'uni-gold': '#CFB87C', 
        },
      },
    },
  },
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')