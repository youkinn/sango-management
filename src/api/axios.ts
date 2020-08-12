/*
 * @Description:
 * @Autor: 胡椒
 * @Date: 2020-08-11 16:13:16
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-12 20:15:33
 */
import axios from 'axios';
import { message } from 'ant-design-vue';

const instance = axios.create({
  baseURL: '',
  timeout: 30000
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
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
    if (!response || response.status !== 200) {
      return Promise.reject('请求异常, 请联系管理员');
    }
    return Promise.resolve(response.data);
  },
  () => {
    message.error('请求异常, 请稍后再试');
    return Promise.reject('请求异常, 请稍后再试');
  }
);

export default instance;
