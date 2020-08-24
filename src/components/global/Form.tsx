/*
 * @Description: 基类
 * @Autor: 胡椒
 * @Date: 2020-08-24 17:50:28
 * @LastEditors: youkinn
 * @LastEditTime: 2020-08-25 02:35:04
 */
import { Vue, Component } from 'vue-property-decorator';
import { VNode } from 'vue';
import { throttle } from '@/decorators';

export default abstract class List extends Vue {
  /** 加载中 */
  protected loading = false;
  /** 表单 */
  protected form: any;

  // 用户点击[提交], 验证成功后发送请求
  @throttle()
  async handleSubmit() {
    const formData = await this.form.validateFields();
    this.$emit('submit', formData);
  }

  // 用户点击[取消], 关闭弹框
  cancel() {
    this.$emit('cancel');
  }

  render(createElement: () => VNode): VNode {
    return createElement();
  }
}
