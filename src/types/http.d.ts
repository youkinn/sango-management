/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 13:43:17
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-12 20:13:30
 */
declare interface ListData {
  count: number;
  next: boolean;
  previous: boolean;
  results: object[];
}

declare interface ResponseBody<T> {
  errorCode: number;
  message: string;
  success: boolean;
  data: T;
}

declare interface Api {
  /**
   * 获取用户列表
   */
  getUserList: (params?: {}) => Promise<ResponseBody<ListData>>;
  [key: string]: (params?: object) => Promise<ResponseBody<any>>;
}
