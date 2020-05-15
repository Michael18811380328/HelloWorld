import Vue from 'vue';
import App from './App';
import { createRouter } from './router';

Vue.config.productionTip = false;

export function createApp() {
  const app = new Vue({
    router,
    render: h => h(app)
  });
  return { app, router }
};
