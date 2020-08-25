/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:50:45
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-25 19:39:34
 * @Description: 过滤器-共同性高跟业务无关
 */
import { timeSpanFormat } from '@/utils';

const dftValue = (value: string, preload = '-') => {
  return value || preload;
};

export default [dftValue, timeSpanFormat];
