/*
 * @Author: youkinn
 * @Date: 2020-08-09 13:23:41
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-25 19:38:59
 * @Description: 工具函数
 */
import moment from 'moment';

export const timeSpanFormat = (value: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) {
    return '-';
  }
  return moment(new Date(+value)).format(format);
};
