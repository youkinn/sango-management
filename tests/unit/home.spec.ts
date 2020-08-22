import { createLocalVue, shallowMount } from '@vue/test-utils';
import utils from '@/utils/index';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();
localVue.use(utils);
localVue.use(antd);

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home, {
      localVue
    });
    expect(wrapper.contains('form')).toBe(false);
  });
});
