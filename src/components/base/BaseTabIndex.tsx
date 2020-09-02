/*
 * @Description: 标签页基类-包含标签页的常规操作(增加/删除等)
 * @Autor: 胡椒
 * @Date: 2020-08-28 09:37:09
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-02 14:18:47
 */
import { Vue, Component } from 'vue-property-decorator';
import { VNode } from 'vue';
import { validate, required } from '@/decorators';

const panes: Pane[] = [];

@Component
export default class TabIndex extends Vue {
  /** 当前活动标签的唯一标识 */
  protected activeKey = panes[0]?.key;
  /** 用于缓冲当前的标签 */
  panes: Pane[] = [];

  edit(targetKey: string, action: string) {
    (this as any)[action](targetKey);
  }

  /** 标签操作-添加一个标签页 */
  @validate
  add(@required key: string, @required title: string, @required path: string) {
    const activeKey = `tab-${key}`;
    const panes = this.panes.filter(item => item.key === activeKey);
    if (panes.length === 0) {
      this.panes.push({
        title: title,
        key: activeKey,
        path: path,
        closable: true
      });
    }
    this.activeKey = activeKey;
    this.$router.push(path);
  }

  /** 标签操作-删除一个标签页 */
  @validate
  remove(@required targetKey: string) {
    let lastIndex = 0;
    this.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.panes.filter(pane => pane.key === targetKey);
    const index = this.panes.indexOf(panes[0]);
    this.panes.splice(index, 1);
    const lastPane = this.panes[lastIndex];
    this.activeKey = lastPane.key;
    if (this.$route.fullPath !== lastPane.path) {
      this.$router.push(lastPane.path);
    }
  }

  /** 标签操作-点击标签相应跳转 */
  @validate
  refresh(@required targetKey: string) {
    const path = this.panes.filter(pane => pane.key === targetKey)[0].path;
    this.$router.push(path);
  }

  render(createElement: () => VNode): VNode {
    return createElement();
  }
}
