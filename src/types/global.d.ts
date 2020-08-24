/* eslint-disable */
import Antd from 'ant-design-vue';
import * as lodash from 'lodash';

declare global {
  const Vue: typeof Vue;
  const antd: typeof Antd;
  const _: typeof lodash;
}
