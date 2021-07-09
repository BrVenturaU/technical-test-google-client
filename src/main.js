import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import IdleVue from "idle-vue";
import {
  BootstrapVue,
  BootstrapVueIcons,
  IconsPlugin,
  ModalPlugin,
} from "bootstrap-vue";
import VueMapbox from '@studiometa/vue-mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/custom.css";

Vue.use(VueMapbox);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(BootstrapVueIcons);

Vue.use(ModalPlugin);

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
});

Vue.use(IdleVue, {
  eventEmitter: app,
  store,
  idleTime: process.env.VUE_APP_INACTIVITY_TIME, 
  startAtIdle: false
});

app.$mount('#app');