import { createLocalVue, mount } from '@vue/test-utils';
import antd from 'ant-design-vue';
import DirectoryListEditForm from '@/components/dictionary/DirectoryListEditForm.vue';
import { EditMode } from '@/const';
import axios from '@/api/__mocks__/axios';

jest.mock('@/api/axios');
// jest.mock('@/api/index');

const localVue = createLocalVue();
localVue.use(antd);

const factory = (values = {}) => {
  return mount(DirectoryListEditForm, {
    localVue,
    ...values,
  });
};

describe('DirectoryListSearchBar', () => {
  it('"查看"模式, 控件被正确渲染', async () => {
    const wrapper = factory({
      propsData: {
        editMode: EditMode.VIEW,
        data: {
          code: '100101',
          name: '性别',
          desc: '性别描述',
        },
      },
    });
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).editMode).toBe(EditMode.VIEW);
    expect((wrapper.find('input#code').element as HTMLInputElement).value).toBe('100101');
    expect((wrapper.find('input#name').element as HTMLInputElement).value).toBe('性别');
    expect((wrapper.find('textarea#desc').element as HTMLInputElement).value).toBe('性别描述');
    expect(wrapper.findAll('button').length).toBe(0);
  });

  it('"新增"模式, 控件被正确渲染', async () => {
    const wrapper = factory({
      propsData: {
        editMode: EditMode.ADD,
        data: {},
      },
    });
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).editMode).toBe(EditMode.ADD);
    expect((wrapper.find('input#code').element as HTMLInputElement).value).toBe('');
    expect((wrapper.find('input#name').element as HTMLInputElement).value).toBe('');
    expect((wrapper.find('textarea#desc').element as HTMLInputElement).value).toBe('');
    expect(wrapper.findAll('button').length).toBe(2);
  });

  it('"编辑"模式, 控件被正确渲染', async () => {
    const wrapper = factory({
      propsData: {
        editMode: EditMode.EDIT,
        data: {
          code: '100101',
          name: '性别',
          desc: '性别描述',
        },
      },
    });
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).editMode).toBe(EditMode.EDIT);
    expect((wrapper.find('input#code').element as HTMLInputElement).value).toBe('100101');
    expect((wrapper.find('input#name').element as HTMLInputElement).value).toBe('性别');
    expect((wrapper.find('textarea#desc').element as HTMLInputElement).value).toBe('性别描述');
    expect(wrapper.findAll('button').length).toBe(2);
  });

  it('"编辑"模式, "字典编码"失去焦点后, 应该检查编码是否已经存在', async () => {
    const wrapper = factory({
      propsData: {
        editMode: EditMode.EDIT,
        data: {
          code: '100101',
          name: '性别',
          desc: '性别描述',
        },
      },
    });
    await wrapper.vm.$nextTick();
    const inputCode = wrapper.find('input#code');
    await inputCode.setValue('1000102');
    await inputCode.vm.$emit('blur');
    expect(inputCode.emitted('blur')).toBeTruthy();

    axios.get.mockResolvedValueOnce(() => {
      return Promise.resolve({
        data: 1,
        success: true,
      });
    });

    const mockFn = jest.fn();
    await (wrapper.vm as any).descriptor.code.rules[1].validator({}, '1000102', mockFn);
    expect(mockFn.mock.calls.length).toBe(1);
  });

  // it('test checkDictionaryCodeExist', () => {
  //   const users = [{ name: 'Bob' }];
  //   const resp = { data: users };
  //   axios.get.mockResolvedValue(resp);
  // });
});
