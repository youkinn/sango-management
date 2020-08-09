/*
 * @Author: youkinn
 * @Date: 2020-08-09 14:54:26
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-10 00:42:28
 * @Description: 过滤器-页面用
 */
const test = (value = '') => {
  return value + '-test';
};
export const pages = [
  {
    id: test.name,
    definition: test
  }
];
