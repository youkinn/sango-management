/*
 * @Description:
 * @Author: youkinn
 * @Date: 2020-08-25 00:23:54
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-25 00:30:39
 *
 */
import { GET, POST } from '@/api/axios';
import { DictionaryListQueryParams } from '@/types/api/index';

/** 获取用户列表 */
export const getDictionaryList = (
  params?: DictionaryListQueryParams
): Promise<ResponseBase<ListData>> => {
  return GET('/api/getDictionaryList', params);
};

/** 添加用户 */
export const addDictionary = (params: { name: string }): Promise<ResponseBase<object>> => {
  return POST('/api/addDictionary', params);
};
