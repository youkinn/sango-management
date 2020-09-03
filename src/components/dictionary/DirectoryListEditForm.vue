<!--
 * @Description: 字典目录新增/编辑表单
 * @Autor: 胡椒
 * @Date: 2020-08-25 09:31:09
 * @LastEditors: 胡椒
 * @LastEditTime: 2020-09-03 17:05:24
-->
<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit.prevent="handleSubmit"
  >
    <a-form-item label="字典编码">
      <a-input
        v-decorator="['code', descriptor.code]"
        :disabled="readonly"
        :maxLength="20"
        placeholder="请输入字典编码"
      />
    </a-form-item>

    <a-form-item label="字典名称">
      <a-input
        v-decorator="['name', descriptor.name]"
        :disabled="readonly"
        :maxLength="20"
        placeholder="请输入名称"
      />
    </a-form-item>

    <a-form-item label="字典描述">
      <a-textarea
        v-decorator="['desc', descriptor.desc]"
        :auto-size="{ minRows: 3, maxRows: 6 }"
        :disabled="readonly"
        placeholder="请输入简要的描述"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="!readonly">
      <a-space>
        <a-button type="primary" :loading="loading" html-type="submit">提交</a-button>
        <a-button @click.prevent="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import BaseForm from '@/components/base/BaseForm';
import { Component, Prop } from 'vue-property-decorator';
import { EditMode } from '@/const';
import { checkDictionaryCodeExist } from '@/api';

/** 字典目录新增/编辑表单 */
@Component
export default class DirectoryEditForm extends BaseForm {
  /** 编辑模式 */
  @Prop({
    type: Number,
    default: EditMode.ADD,
    validator: (value: number) => {
      return [EditMode.VIEW, EditMode.ADD, EditMode.EDIT].includes(value);
    }
  })
  private editMode!: number;

  /** 编辑模式下回显数据用载体 */
  @Prop({
    type: Object,
    default: () => {}
  })
  private data: any;

  /** 表单字段描述 */
  descriptor = {
    /** 字典编码 */
    code: {
      initialValue: this.data && this.data.code,
      trigger: 'blur',
      rules: [
        {
          required: true,
          message: '请输入字典编码'
        },
        {
          validator: async (rule: object, value: string, callback: Function) => {
            const _id = this.data._id;
            const code = value;
            const { data } = await checkDictionaryCodeExist({ _id, code });
            if (data > 0) {
              callback(new Error('编码已存在'));
            } else {
              callback();
            }
          }
        }
      ]
    },

    /** 字典名称 */
    name: {
      initialValue: this.data && this.data.name,
      rules: [
        {
          required: true,
          message: '请输入字典名称'
        }
      ]
    },

    /** 字典描述 */
    desc: {
      initialValue: this.data && this.data.desc,
      rules: [
        {
          max: 20,
          message: '最多输入20个字符'
        }
      ]
    }
  };

  /** 查看模式 */
  get readonly() {
    return this.editMode === EditMode.VIEW;
  }
}
</script>
