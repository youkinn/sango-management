/*
 * @Description: 字典管理-相关接口
 * @Author: youkinn
 * @Date: 2020-08-25 00:23:54
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-25 19:52:27
 *
 */
import { GET, POST, PATCH, DELETE } from '@/api/axios';
import { DictionaryListQueryParams, DictionaryForm } from '@/types/api/index';

/** 获取字典列表 */
export const getDictionaryList = (
  params?: DictionaryListQueryParams
): Promise<ResponseBase<ListData>> => {
  return GET('/dictionaries', params);
};

/** 添加字典 */
export const addDictionary = (params: DictionaryForm): Promise<ResponseBase<object>> => {
  return POST('/dictionary', params);
};

/** 编辑字典 */
export const editDictionary = (
  id: string,
  params: DictionaryForm
): Promise<ResponseBase<object>> => {
  return PATCH(`/dictionary/${id}`, params);
};

/** 删除字典 */
export const delDictionary = (id: string): Promise<ResponseBase<object>> => {
  return DELETE(`/dictionary/${id}`);
};
