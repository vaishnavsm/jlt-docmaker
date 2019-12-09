import Vue from 'vue'
import App from './App.vue'
import LandingPage from './components/LandingPage.vue'
import KeyValPage from './components/KeyValPage.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'landing_page', component: LandingPage },
    { path: '/manually_enter', name: 'key_val_page', component: KeyValPage },
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
