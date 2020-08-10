import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';

import directives from '@/directives/index';
import filters from '@/filters/index';
import utils from '@/utils/index';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(directives);
Vue.use(filters);
Vue.use(utils);

Vue.filter('capitalize', function(value = '') {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
