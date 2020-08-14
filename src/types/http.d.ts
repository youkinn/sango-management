/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 13:43:17
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-14 18:03:03
 */
/**
 * 列表类型接口返回的data
 * @param {number} count 列表数量
 * @param {boolean} next 是否有下一条
 * @param {boolean} previous 是否有上一条
 * @param {object[]} results 列表数据
 */
interface ListData {
  count: number;
  next: boolean;
  previous: boolean;
  results: object[];
}

/**
 * @description: 响应返回类型
 * @param {number} errorCode 错误编码
 * @param {string} message 消息
 * @param {boolean} success 是否成功
 * @param {any} data 返回的数据
 */
interface ResponseBase<T> {
  errorCode: number;
  message: string;
  success: boolean;
  data: T;
}

interface RequestParams {
  [key: string]: any;
}

/**
 * 列表接口共同参数
 * @param page 当前页码
 * @param pageSize 一页的条数
 */
interface PaginationParams {
  page: number;
  pageSize: number;
}
