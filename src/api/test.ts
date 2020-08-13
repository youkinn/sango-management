/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 11:40:32
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-13 20:57:14
 */
import axios from '@/api/axios';

/**
 * 获取用户列
 */
export const getUserList = (params?: {
  /** 页码 */
  page: number;
}): Promise<ResponseBody<ListData>> => {
  return axios.get('/api/operators/v1/goods-warning/', { params });
};

export const updateRemark = (params: {
  id: number;
  remark: string;
}): Promise<ResponseBody<object>> => {
  return axios.patch(`/api/operators/v1/live-group-apply/${params.id}/`, {
    remark: params.remark
  });
};
