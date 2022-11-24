import { createApp } from 'vue'
import {createPinia} from 'pinia'
import {createGtm} from '@gtm-support/vue-gtm'
import RequestService from './services/RequestService';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import router from './router'


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import './assets/css/reset.css';
import './assets/css/app.css';
import './assets/css/flex.css';
import './assets/css/irregulars.css';
import './assets/css/columns.css';
import './assets/css/transitions.css';
// import './assets/css/primevue.css';
// import './assets/css/pin.css';
// import './assets/css/pin-searched.css';
import './assets/css/formstyle.css';
import './assets/css/dark-theme.css';
import './assets/css/dynamic-form.css';
import { createI18n } from 'vue-i18n';

const app = createApp(App);
const pinia = createPinia();
const primeOptions = {
  locale: {
    emptyMessage: '選択できるものがありません。'
  }
}
const languageSetting = window.navigator.language
const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false, // you must set `false`, to use Composition API
  locale: languageSetting, // set locale
  fallbackLocale: languageSetting, // set fallback locale
})

app.use(pinia)
app.use(PrimeVue,primeOptions)
app.use(router)
app.use(i18n)

const service = new RequestService();
service.getRoom().then((response: any) => {
  if(response && response.gtmid){
    app.use(createGtm({
      id: response.gtmid,
      enabled: false,
      vueRouter: router,
    }))
  }
  app.component('Dropdown', Dropdown)
  app.mount('#app')
}).catch(() => {
  console.log("NT")
  app.component('Dropdown', Dropdown)
  app.mount('#app')
});