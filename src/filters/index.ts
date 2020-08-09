/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:46:45
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-10 00:58:47
 * @Description: 过滤器
 */
import _Vue, { PluginObject } from 'vue';
import { FilterDefinition } from '@/types/vue-prototype';
import { common } from '@/filters/common';
import { pages } from '@/filters/pages';

const filters: PluginObject<object> = {
  install(Vue: typeof _Vue) {
    const result = [...common, ...pages];
    result.forEach(({ id, definition }: FilterDefinition) => {
      Vue.filter(`${id}Filter`, definition);
    });
  }
};

export default filters;
