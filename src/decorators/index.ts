/*
 * @Description: 自定义装饰器
 * @Autor: 胡椒
 * @Date: 2020-08-21 12:47:10
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-21 13:52:54
 */
import ExtendedVue from 'vue';

/** 防抖 */
export const debounce = (
  target: ExtendedVue,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void => {
  descriptor.value = target.$util.debounce(descriptor.value, 3000);
};

/** 节流 */
export const throttle = (
  target: ExtendedVue,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void => {
  descriptor.value = target.$util.throttle(descriptor.value, 3000);
};
