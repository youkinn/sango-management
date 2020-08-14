/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:23:41
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-13 20:36:19
 * @Description: 工具函数
 */
import _Vue from 'vue';
import _ from 'lodash';

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$util = _;
  }
};
