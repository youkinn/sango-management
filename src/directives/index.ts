/*
 * @Description: 加载当前目录下以Dir.ts结尾的文件并注册为指令
 * @Author: youkinn
 * @Date: 2020-08-09 17:44:29
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-24 17:38:13
 */

import _Vue, { PluginObject } from 'vue';
import { DirectiveDefinition } from '@/types/vue-prototype';

const directives: PluginObject<object> = {
  install(Vue: typeof _Vue) {
    const contexts = require.context('.', false, /Dir\.ts$/);
    contexts.keys().forEach(item => {
      const { id, definition }: DirectiveDefinition = contexts(item).default;
      Vue.directive(id, definition);
    });
  }
};

export default directives;
