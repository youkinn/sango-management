import { createLocalVue, shallowMount } from '@vue/test-utils';
import Test from '@/views/test/index.vue';
import antd from 'ant-design-vue';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(antd);

// jest.mock('@/decorators');
jest.mock('@/api/index');
jest.mock('@/api/axios');

describe('Test.vue', () => {
  it('点击提交按钮，handleSubmit方法应该被调用', async () => {
    const wrapper = shallowMount(Test, {
      localVue
    });
    const handleSubmit = sinon.stub(wrapper.vm as any, 'handleSubmit');
    console.log(11, handleSubmit);
    await wrapper.setMethods({
      handleSubmit
    });
    const submitBtn = wrapper.find('.testBtn');
    expect(submitBtn.exists()).toBe(true);
    submitBtn.trigger('click');
    submitBtn.trigger('click');
    submitBtn.trigger('click');

    // vm.handleSubmit已被改变，次数会是3
    expect(handleSubmit.callCount).toBe(3);

    // todo: 断言请求只会被发送一次

    wrapper.destroy();
  });
});
