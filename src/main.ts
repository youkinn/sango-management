/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-19 17:04:57
 */
import App from './App.vue';
import router from './router';
import store from './store';
import directives from '@/directives/index';
import filters from '@/filters/index';
import utils from '@/utils/index';
import '@/assets/less/index.less';

Vue.config.productionTip = false;
Vue.use(directives);
Vue.use(filters);
Vue.use(utils);
Vue.use(antd);

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    router.push('/404');
    next(false);
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
