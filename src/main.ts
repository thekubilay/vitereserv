import { createApp } from 'vue'
import {createPinia} from 'pinia'

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

const app = createApp(App);
const pinia = createPinia();
const primeOptions = {
  locale: {
    emptyMessage: '選択できるものがありません。'
  }
}


app.use(pinia)
app.use(PrimeVue,primeOptions)
app.use(router)
app.component('Dropdown', Dropdown)
app.mount('#app')