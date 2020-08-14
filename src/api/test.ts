/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 11:40:32
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-14 17:50:06
 */
import { GET } from '@/api/axios';
import { UserListQueryParams } from '@/types/api/index';

/** 获取用户列表 */
export const getUserList = (
  params?: UserListQueryParams
): Promise<ResponseBase<ListData>> => {
  return GET('/api/operators/v1/goods-warning/', params);
};
