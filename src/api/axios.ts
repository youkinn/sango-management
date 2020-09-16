/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 16:13:16
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-03 14:36:27
 */
import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
const qs = require('qs');

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_PATH,
  timeout: 30000,
});

const ERROR_MESSAGE = '哎呀, 服务器开小差了';

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const { csrfToken } = qs.parse(document.cookie);
    config.headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'x-csrf-token': csrfToken,
    };
    const t = new Date().getTime();
    const params = {
      ...config.params,
      t,
    };
    const method = config.method?.toUpperCase() as string;
    if (['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method)) {
      config.params = params;
    } else if (['POST', 'PATCH', 'PUT'].includes(method)) {
      config.params = null;
      config.data = qs.stringify(params);
    }
    return config;
  },
  err => {
    message.error(ERROR_MESSAGE);
    return Promise.resolve(err);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response && response.data) {
      return Promise.resolve(response);
    } else {
      message.error(ERROR_MESSAGE);
      return Promise.reject(response);
    }
  },
  err => {
    message.error('哎呀, 请求出问题了');
    return Promise.reject(err);
  },
);

/** 发起一个请求 */
const request = <T>(config: AxiosRequestConfig): Promise<ResponseBase<T>> => {
  return new Promise((resolve, reject) => {
    instance.request<ResponseBase<T>>(config).then(
      res => {
        const result = res.data;
        if (result.success) {
          resolve(result);
        } else {
          message.error(result.message || ERROR_MESSAGE);
          reject(result);
        }
      },
      err => reject(err),
    );
  });
};

/** 发起一个GET请求 */
export const GET = <T>(
  url: string,
  params?: RequestParams,
  options?: AxiosRequestConfig,
): Promise<ResponseBase<T>> => {
  return request(Object.assign({ url: url, method: 'GET', params }, options));
};

/** 发起一个DELETE请求 */
export const DELETE = <T>(
  url: string,
  params?: RequestParams,
  options?: AxiosRequestConfig,
): Promise<ResponseBase<T>> => {
  return request(Object.assign({ url: url, method: 'DELETE', params }, options));
};

/** 发起一个POST请求 */
export const POST = <T>(
  url: string,
  params: RequestParams,
  options?: AxiosRequestConfig,
): Promise<ResponseBase<T>> => {
  return request(Object.assign({}, { url: url, method: 'POST', params }, options));
};

/** 发起一个PATCH请求 */
export const PATCH = <T>(
  url: string,
  params: RequestParams,
  options?: AxiosRequestConfig,
): Promise<ResponseBase<T>> => {
  return request(Object.assign({}, { url: url, method: 'PATCH', params }, options));
};

export default { GET, DELETE, POST, PATCH };
