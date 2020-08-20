/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 11:40:32
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-20 11:54:41
 */
import { GET, POST } from '@/api/axios';
import { UserListQueryParams } from '@/types/api/index';

/** 获取用户列表 */
export const getUserList = (params?: UserListQueryParams): Promise<ResponseBase<ListData>> => {
  return GET('/api/getUserList', params);
};

/** 添加用户 */
export const addUser = (params: { name: string }): Promise<ResponseBase<object>> => {
  return POST('/api/addUser', params);
};
