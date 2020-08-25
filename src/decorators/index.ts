/*
 * @Description: 自定义装饰器
 * @Autor: 胡椒
 * @Date: 2020-08-21 12:47:10
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-25 13:42:30
 */
import { debounce as debounceFn, throttle as throttleFn } from 'lodash';
import ExtendedVue from 'vue';

/** 防抖函数-wait指定调用被推迟的时间(默认3s) */
export const debounce = (wait = 3000): Function => {
  return (target: ExtendedVue, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = debounceFn(descriptor.value, wait || 3000, { trailing: false });
  };
};

/** 节流函数-wait指定触发间隔(默认3s) */
export const throttle = (wait = 3000): Function => {
  return (target: ExtendedVue, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = throttleFn(descriptor.value, wait, { trailing: false });
  };
};

/** 捕获异常处理-将传入的函数用try catch块包裹 */
export function catchError(
  target: ExtendedVue,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const fn = descriptor.value;
  descriptor.value = function(...args: any[]) {
    try {
      fn.apply(this, args);
    } catch (ex) {
      console.log(11, ex);
    }
  };
}
