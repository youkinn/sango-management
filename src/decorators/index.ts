/*
 * @Description: 自定义装饰器
 * @Autor: 胡椒
 * @Date: 2020-08-21 12:47:10
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-24 00:19:15
 */
import { debounce as debounceFn, throttle as throttleFn } from 'lodash';
import ExtendedVue from 'vue';

/** 防抖 */
export const debounce = (wait?: number): Function => {
  return (target: ExtendedVue, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = debounceFn(descriptor.value, wait || 3000, { trailing: false });
  };
};

/** 节流 */
export const throttle = (wait?: number): Function => {
  return (target: ExtendedVue, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = throttleFn(descriptor.value, wait || 3000, { trailing: false });
  };
};
