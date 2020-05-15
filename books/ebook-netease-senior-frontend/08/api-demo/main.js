import Vue from 'vue';
import App from './App';
import router from './router';
import qa from './api.js';

Vue.prototype.qa = qa;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
