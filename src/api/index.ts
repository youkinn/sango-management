/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 11:39:48
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-12 20:04:42
 */
import _Vue from 'vue';
import * as test from '@/api/test';
import { message } from 'ant-design-vue';

const modules = [test];

const preHandleResponse = (result: ResponseBody<object>) => {
  if (!result.success) {
    message.error('请求异常, 请稍后再试');
    return Promise.reject('请求异常, 请稍后再试');
  }
  return Promise.resolve(result);
};

const merge = (source: any, target: any) => {
  const keys = Object.keys(source);
  keys.forEach((item = '') => {
    if (!target[item]) {
      Object.defineProperty(target, item, {
        value: async (...params: []) => {
          const result = await source[item](...params);
          return preHandleResponse(result);
        }
      });
    }
  });
};

export default {
  install(Vue: typeof _Vue) {
    const api = {};
    modules.forEach(item => {
      merge(item, api);
    });
    Vue.prototype.$api = api;
  }
};
