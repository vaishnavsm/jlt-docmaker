import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import BootstrapVue from 'bootstrap-vue';
import LoadScript from 'vue-plugin-load-script';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(LoadScript);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
