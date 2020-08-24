/*
 * @Description: 基类
 * @Autor: 胡椒
 * @Date: 2020-08-24 17:50:28
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-24 19:11:14
 */
import { Vue, Component } from 'vue-property-decorator';
import { VNode } from 'vue';

@Component
export default class Base extends Vue {
  /** 加载中 */
  protected loading = false;

  /** 分页信息 */
  pagination = {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showTotal: (total: number) =>
      `共 ${total} 条记录 第 ${this.pagination.current}/${Math.ceil(
        total / this.pagination.pageSize
      )} 页`,
    showQuickJumper: true,
    showSizeChanger: true,
    onShowSizeChange: (current: number, pageSize: number) => (this.pagination.pageSize = pageSize)
  };

  render(createElement: () => VNode): VNode {
    return createElement();
  }
}
