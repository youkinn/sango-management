/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-25 19:25:31
 */
import App from './App.vue';
import router from './router';
import store from './store';
// import components from '@/components/global/index';
import directives from '@/directives/index';
import filters from '@/filters/index';
import '@/assets/less/index.less';

Vue.config.productionTip = false;
Vue.use(antd);
// Vue.use(components);
Vue.use(directives);
Vue.use(filters);

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
