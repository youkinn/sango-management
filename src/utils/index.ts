/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:23:41
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-09 23:22:58
 * @Description: 工具函数
 */
import _Vue from 'vue';
import _ from 'lodash';

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$util = _;
  }
};
