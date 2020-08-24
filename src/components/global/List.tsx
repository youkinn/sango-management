/*
 * @Description: 基类
 * @Autor: 胡椒
 * @Date: 2020-08-24 17:50:28
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-24 20:41:24
 */
import { Vue, Component } from 'vue-property-decorator';
import { VNode } from 'vue';

const pageSize = 10;

interface Pagination {
  /** 当前页数 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 指定每页可以显示多少条 */
  pageSizeOptions: string[];
  /** 数据总数	 */
  total: number;
  /** 用于显示数据总量和当前数据顺序 */
  showTotal: (total: number) => string;
  /** 是否可以快速跳转至某页 */
  showQuickJumper: boolean;
  /** 每页条数 */
  showSizeChanger: boolean;
  /** 是否可以改变 pageSize */
  onShowSizeChange: (current: number, pageSize: number) => void;
}

export default abstract class List extends Vue {
  /** 加载中 */
  protected loading = false;

  /** 分页信息 */
  protected pagination: Pagination = {
    current: 1,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    total: 0,
    showTotal: (total: number) =>
      `共 ${total} 条记录 第 ${this.pagination.current}/${Math.ceil(total / pageSize)} 页`,
    showQuickJumper: true,
    showSizeChanger: true,
    onShowSizeChange: (current: number, pageSize: number) => (this.pagination.pageSize = pageSize)
  };

  abstract getList(): void;

  // 分页
  protected handleTableChange(pagination: Pagination) {
    if (pagination) {
      this.pagination.current = pagination.current;
    }
    this.getList();
  }

  render(createElement: () => VNode): VNode {
    return createElement();
  }
}
