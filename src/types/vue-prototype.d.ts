/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-10 09:32:04
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-13 20:39:38
 */
import { DirectiveOptions, DirectiveFunction } from 'vue';
import * as _ from 'lodash';

declare module 'vue/types/vue' {
  interface Vue {
    /** Lodash：https://www.lodashjs.com/ */
    $util: _.LoDashStatic;

    /** Api */
    $api: Api;
  }
}

/**
 * 指令定义
 */
export interface DirectiveDefinition {
  id: string;
  definition: DirectiveOptions | DirectiveFunction;
}

export type FilterFunction = (value: string) => string;

/**
 * 过滤器定义
 */
export interface FilterDefinition {
  id: string;
  definition: FilterFunction;
}
