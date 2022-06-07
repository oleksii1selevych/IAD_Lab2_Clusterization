import { createApp } from 'vue'
import App from './App.vue'

import router from './routing/index.js';

import primeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import vueApexCharts from 'vue3-apexcharts';

const app = createApp(App); 

app.use(primeVue);
app.use(router);
app.use(vueApexCharts);

app.mount('#app');
