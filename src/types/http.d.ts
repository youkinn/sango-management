/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 13:43:17
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-11 15:01:02
 */
declare type ListResponseData = {
  count: number;
  next: boolean;
  previous: boolean;
  results: Array<any>;
};

declare type ListResponseBody = {
  errorCode: number;
  message: string;
  success: boolean;
  data: ListResponseData;
};
