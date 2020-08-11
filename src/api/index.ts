/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 11:39:48
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-11 20:12:27
 */
import _Vue from 'vue';
import * as test from '@/api/test';

const modules = [test];

const preHandleResponse = (result: any) => {
  const { success, data } = result;
  if (!success) {
    return Promise.reject('请求异常, 请稍后再试');
  }
  return Promise.resolve(data);
};

const merge = (source: any, target: any) => {
  const keys = Object.keys(source);
  keys.forEach((item = '') => {
    if (!target[item]) {
      Object.defineProperty(target, item, {
        value: (params: any) => {
          return source[item](params).then((data: any) => {
            return preHandleResponse(data);
          });
        }
      });
    }
    // target[item] = (params: any) => {
    //   return source[item](params).then((data: any) => {
    //     return preHandleResponse(data);
    //   });
    // };
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
