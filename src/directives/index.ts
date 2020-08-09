/*
 * @Author: youkinn
 * @Date: 2020-08-09 17:44:29
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-10 00:44:24
 * @Description: 指令
 */
import _Vue, { PluginObject } from 'vue';
import { DirectiveDefinition } from '@/types/vue-prototype';
import focus from './focus';

const result = [focus];

const directives: PluginObject<object> = {
  install(Vue: typeof _Vue) {
    result.forEach(({ id, definition }: DirectiveDefinition) => {
      Vue.directive(id, definition);
    });
  }
};

export default directives;
