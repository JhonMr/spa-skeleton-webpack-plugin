import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as tools from './utils/tools';
import '@/scss/common.scss';

Vue.prototype.$tools = tools;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
