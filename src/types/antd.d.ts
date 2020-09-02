/* eslint-disable */
interface zhCN {
  [key: string]: any;
}
declare module 'ant-design-vue/lib/locale-provider/zh_CN' {
  import zh from 'ant-design-vue/lib/locale-provider/zh_CN';
  const zh_CN: zhCN;

  export default zh_CN;
}

/** 标签页 */
declare interface Pane {
  /** 唯一标识 */
  key: string;
  /** 标签标题 */
  title: string;
  /** 对应的路由路径 */
  path: string;
  /** 是否允许关闭 */
  closable: boolean;
}
