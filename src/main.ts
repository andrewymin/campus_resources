import { createApp } from 'vue'
// import './style.css'
import "./css/test.css";
import App from './App.vue'

// createApp(App).mount('#app')
// Vuetify
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')