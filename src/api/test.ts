/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 11:40:32
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-11 20:18:03
 */

import axios from '@/api/axios';

/**
 * 获取用户列表
 */
export const getUserList = (params = {}): Promise<ListResponseBody> => {
  return axios.get('/api/operators/v1/goods-w1arning/', { params });
};
