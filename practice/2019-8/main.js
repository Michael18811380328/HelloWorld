import Vue from 'vue';
import App from './App';
import router from  './router';
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAMap from 'vue-amap';

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'test key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '0.0.1'
});
Vue.config.prodectionTip = false;