/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:23:41
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-03 11:21:57
 * @Description: 工具函数
 */
import moment from 'moment';

export const timeSpanFormat = (value: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) {
    return '-';
  }
  return moment(new Date(+value)).format(format);
};

/**
 * @description: 睡会觉
 * @param wait 毫秒(默认2000)
 */
export const sleep = (wait = 2000) => {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(), wait);
  });
};
