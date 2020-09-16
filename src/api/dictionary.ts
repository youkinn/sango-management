/*
 * @Description: 字典管理-相关接口
 * @Author: youkinn
 * @Date: 2020-08-25 00:23:54
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-16 11:42:01
 *
 */
import { GET, POST, PATCH, DELETE } from '@/api/axios';
import {
  DictionaryListQueryParams,
  DictionaryForm,
  DictionaryContentForm,
} from '@/types/api/index';

/** 获取字典列表 */
export const getDictionaryList = (
  params: DictionaryListQueryParams,
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
  params: DictionaryForm,
): Promise<ResponseBase<object>> => {
  return PATCH(`/dictionary/${id}`, params);
};

/** 删除字典 */
export const delDictionary = (id: string): Promise<ResponseBase<object>> => {
  return DELETE(`/dictionary/${id}`);
};

/** 检测字典编码是否已存在 */
export const checkDictionaryCodeExist = (params: {
  _id?: string;
  code: string;
}): Promise<ResponseBase<number>> => {
  return GET('/dictionaryExist', params);
};

/** 获取字典内容列表 */
export const getDictionaryById = (dictionaryId: string): Promise<ResponseBase<object>> => {
  return GET(`/dictionary/${dictionaryId}/contents`);
};

/** 添加字典内容 */
export const addDictionaryContent = (
  dictionaryId: string,
  params: DictionaryContentForm,
): Promise<ResponseBase<object>> => {
  return POST(`/dictionary/${dictionaryId}/content`, params);
};

/** 编辑字典内容 */
export const editDictionaryContent = (
  dictionaryId: string,
  contentId: string,
  params: DictionaryContentForm,
): Promise<ResponseBase<object>> => {
  return PATCH(`/dictionary/${dictionaryId}/content/${contentId}`, params);
};

/** 删除字典内容 */
export const delDictionaryContent = (
  dictionaryId: string,
  contentId: string,
): Promise<ResponseBase<object>> => {
  return DELETE(`/dictionary/${dictionaryId}/content/${contentId}`);
};
