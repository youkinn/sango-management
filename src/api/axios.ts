/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 16:13:16
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-14 17:58:49
 */
import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';

const instance = axios.create({
  baseURL: process.env.VUE_API_BASE_URL,
  timeout: 30000
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const t = new Date().getTime();
    const params = {
      ...config.params,
      t
    };
    const method = config.method?.toUpperCase() as string;
    if (method == 'GET') {
      config.params = params;
    } else if (['POST', 'PATCH', 'PUT'].indexOf(method) > -1) {
      config.data = params;
    }
    return config;
  },
  error => {
    message.error(`发送请求出错 msg:${error.message}`);
    return Promise.resolve(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response && response.data) {
      return Promise.resolve(response);
    } else {
      return Promise.reject('请求异常, 请联系管理员');
    }
  },
  () => {
    message.error('请求异常, 请稍后再试');
    return Promise.reject('请求异常, 请稍后再试');
  }
);

/** 发起一个请求 */
const request = <T>(config: AxiosRequestConfig): Promise<ResponseBase<T>> => {
  return new Promise((resolve, reject) => {
    instance.request<ResponseBase<T>>(config).then(res => {
      const result = res.data;
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
};

/** 发起一个GET请求 */
export const GET = <T>(
  url: string,
  params?: RequestParams,
  options?: AxiosRequestConfig
): Promise<ResponseBase<T>> => {
  return request(Object.assign({ url: url, method: 'GET', params }, options));
};

/** 发起一个POST请求 */
export const POST = <T>(
  url: string,
  params: RequestParams,
  options?: AxiosRequestConfig
): Promise<ResponseBase<T>> => {
  return request(
    Object.assign({}, { url: url, method: 'POST', params }, options)
  );
};

export default { GET, POST };
