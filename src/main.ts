/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-14 17:55:49
 */
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
