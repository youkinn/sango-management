/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:50:45
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-10 00:36:26
 * @Description: 过滤器-共同性高跟业务无关
 */
const dftValue = (value: string, preload = '-') => {
  return value || preload;
};
export const common = [
  {
    id: dftValue.name,
    definition: dftValue
  }
];
