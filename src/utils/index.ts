/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:23:41
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-16 15:17:55
 * @Description: 工具函数
 */
import moment from 'moment';

/**
 * 时间戳时间格式化
 * @param value 待格式化时间戳字符串
 * @param format 格式 default：YYYY-MM-DD HH:mm:ss
 */
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
