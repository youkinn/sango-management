import { createLocalVue, mount } from '@vue/test-utils';
import antd, { Button, Form } from 'ant-design-vue';
import DirectoryListSearchBar from '@/components/dictionary/DirectoryListSearchBar.vue';
import { sleep } from '@/utils';

const localVue = createLocalVue();
localVue.use(antd);

const factory = () => {
  return mount(DirectoryListSearchBar, {
    localVue
  });
};

describe('DirectoryListSearchBar', () => {
  it('控件被正确渲染', () => {
    const wrapper = factory();
    expect(wrapper.find('input#keyword').exists()).toBe(true);
    expect(wrapper.findComponent(Button).text()).toBe('查询');

    wrapper.destroy();
  });

  it('提交表单，向父组件传递正确的查询参数', async () => {
    const wrapper = factory();
    const form = wrapper.findComponent(Form);

    const inputKeyword = form.find('input#keyword');
    await inputKeyword.setValue('666');
    await form.trigger('submit');
    const params = wrapper.emitted('submit') as any;
    expect(params[0]).toEqual([{ keyword: '666' }]);

    // 间隔很短，不会被处理
    await inputKeyword.setValue('11');
    await form.trigger('submit');
    expect(params[1]).toBeUndefined();

    await sleep();

    // 等待2秒后，以正确的参数提交表单
    await inputKeyword.setValue('张三');
    await form.trigger('submit');
    expect(params[1]).toEqual([{ keyword: '张三' }]);

    wrapper.destroy();
  });
});
