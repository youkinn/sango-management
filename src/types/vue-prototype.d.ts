import { DirectiveOptions, DirectiveFunction } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $util: object;
    $api: Api;
  }
}

type Api = {
  [key: string]: (params?: any) => Promise<ListResponseData>;
};

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
