/*
 * @Description: Form基类
 * @Autor: 胡椒
 * @Date: 2020-08-24 17:50:28
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-08-31 18:53:01
 */
import { Vue, Component, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';
import { throttle, catchError } from '@/decorators';

@Component
export default class Form extends Vue {
  /** 加载中 */
  @Prop({ default: false }) protected loading?: boolean;

  /** 表单 */
  protected form: any;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  // 用户点击[提交], 验证成功后发送请求
  @throttle()
  @catchError
  async handleSubmit() {
    const formData = await this.form.validateFields();
    this.$emit('submit', formData);
  }

  // 用户点击[取消], 关闭弹框
  cancel() {
    this.form.resetFields();
    this.$emit('cancel');
  }

  render(createElement: () => VNode): VNode {
    return createElement();
  }
}
