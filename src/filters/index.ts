/*
 * @Description: 加载当前目录下以Flt.ts结尾的文件并注册为全局过滤器
 * @Author: youkinn
 * @Date: 2020-08-09 13:46:45
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-24 17:38:21
 */
import _Vue, { PluginObject } from 'vue';

const filters: PluginObject<object> = {
  install(Vue: typeof _Vue) {
    const contexts = require.context('.', false, /Flt.ts$/);
    contexts.keys().forEach(item => {
      const filters = contexts(item).default;
      filters.forEach((item: Function) => {
        Vue.filter(`${item.name}Filter`, item);
      });
    });
  }
};

export default filters;
