/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-24 17:22:01
 */
import { DirectiveOptions, DirectiveFunction } from 'vue';
import * as _ from 'lodash';

declare module 'vue/types/vue' {
  interface Vue {
    /** Lodash：https://www.lodashjs.com/ */
    $util: _.LoDashStatic;
  }
}

/**
 * 指令定义
 */
export interface DirectiveDefinition {
  id: string;
  definition: DirectiveOptions | DirectiveFunction;
}
